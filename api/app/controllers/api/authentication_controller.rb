module Api
  class AuthenticationController < ApiController
    skip_before_action :authenticate, only: [:create]

    def create
      result = AuthenticationService.authenticate_user(login_params[:email], login_params[:password])

      if result
        render json: {
          name: result[:user].name,
          email: result[:user].email,
          token: result[:token],
        }, status: :ok
      else
        render json: { error: 'Credenciais inválidas' }, status: :unauthorized
      end
    end

    private

    def login_params
      params.permit(:email, :password)
    end
  end
end
