class UserService
  class << self
    def create_user(params)
      user = User.new(params)
      if user.save
        {
          user: user,
          token: JsonWebToken.encode(user_id: user.id),
        }
      else
        { errors: user.errors.full_messages }
      end
    end

    def destroy_user(user, password)
      if user.authenticate(password)
        Contact.where(user_id: user.id).destroy_all
        user.destroy
        { message: 'Conta excluída!' }
      else
        { error: 'Senha incorreta' }
      end
    end
  end
end
