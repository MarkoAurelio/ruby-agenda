class UserService
  class << self
    def find_contacts(user)
      user.contacts
    end

    def create_user(user_params)
      @user = User.create!(user_params)
    end

    def find_contact(user, contact_id)
      user.contacts.find_by(id: contact_id)
    end

    def delete_user(user, contact)
      contact.destroy
    end

    def update_contact(user, contact, contact_params)
      contact.update(contact_params)
    end
  end
end
