module Api
  class UsersController < ApiController
    skip_before_action :authenticate, only: [:create]

    def create
      result = UserService.create_user(user_params)

      if result.key?(:user)
        render_user_with_token(result[:user], result[:token])
      else
        render json: { errors: result[:errors] }, status: :unprocessable_entity
      end
    end

    def destroy
      result = UserService.destroy_user(current_user, params[:password])

      if result.key?(:message)
        render json: result, status: :ok
      else
        render json: result, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:name, :email, :password)
    end

    def render_user_with_token(user, token)
      render json: {
        name: user.name,
        email: user.email,
        token: token,
      }, status: :created
    end
  end
end
