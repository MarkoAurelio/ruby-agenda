module Api
  class AuthenticationController < ApplicationController
    def login
      @user = User.find_by(email: params[:user][:email])

      if @user && @user.authenticate(params[:user][:password])
        token = JsonWebToken.encode(user_id: @user.id)
        render json: { token: token }
      else
        render json: { error: 'Invalid credentials' }, status: :unauthorized
      end
    end

    def logout
      render json: { message: 'Logged out successfully' }
    end
  end
end
