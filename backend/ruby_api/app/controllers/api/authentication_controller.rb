module Api
  class AuthenticationController < ApplicationController
    # skip_before_action :authenticate, only: [:login]
    def login
      @user = User.find_by(email: login_params[:user][:email])

      if @user&.authenticate(login_params[:user][:password])
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
