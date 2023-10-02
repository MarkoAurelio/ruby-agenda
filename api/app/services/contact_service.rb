class ContactService
  class << self
    def find_contacts(user)
      user.contacts
    end

    def find_contact(user, id)
      user.contacts.find_by(id: id)
    end

    def create_contact(user, params)
      user.contacts.build(params)
    end

    def update_contact(contact, params)
      contact.update(params)
    end

    def delete_contact(contact)
      contact.destroy if contact
    end
  end
end
