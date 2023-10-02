# frozen_string_literal: true

module Api
  class ApiController < ActionController::API
    before_action :authenticate

    private

    def authenticate
      header = request.headers['Authorization']
      jwt = header.split(' ').last if header.present?

      @decoded = JsonWebToken.decode(jwt)
      user_id = @decoded[:user_id]
      @user = User.find(user_id)

      true
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError, JWT::VerificationError, CustomException::BadRequest::UnauthorizedUser => e
      render json: { message: message }, status: :unauthorized
    end

    def current_user
      @user
    end
  end
end
