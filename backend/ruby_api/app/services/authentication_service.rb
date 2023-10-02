module AuthenticationService
  class << self
    def authenticate_user(email, password)
      user = User.find_by(email: email)
      return nil unless user&.authenticate(password)

      {
        user: user,
        token: JsonWebToken.encode(user_id: user.id),
      }
    end
  end
end
