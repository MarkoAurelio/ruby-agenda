module Api
  class AuthenticationController < ApiController
    skip_before_action :authenticate, only: [:create]

    def create
      @user = User.find_by(email: login_params[:email])

      if @user&.authenticate(login_params[:password])
        token = JsonWebToken.encode(user_id: @user.id)
        render json: {
          name: @user.name,
          email: @user.email,
          token: token,
        }, status: :ok
      else
        render json: { error: 'Invalid credentials' }, status: :unauthorized
      end
    end

    def logout
      render json: { message: 'Logged out successfully' }
    end

    private

    def login_params
      params.permit(:email, :password)
    end
  end
end
