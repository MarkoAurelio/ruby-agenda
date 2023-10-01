module Api
  class UsersController < ApiController
    skip_before_action :authenticate, only: [:create]

    def create
      @user = User.new(user_params)

      if @user.save
        token = JsonWebToken.encode(user_id: @user.id)
        render json: {
          name: @user.name,
          email: @user.email,
          token: token,
        }, status: :created
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @user = User.find(current_user[:id])
      if @user.authenticate(params[:password])
        Contact.where(user_id: @user.id).destroy_all # Excluir todos os contatos do usuário
        @user.destroy
        render json: { message: 'Conta excluída!' }, status: :ok
      else
        render json: { error: 'Senha incorreta' }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:name, :email, :password)
    end
  end
end
