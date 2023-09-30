module Api
  class ContactsController < ApiController
    before_action :set_contact, only: [:show, :destroy]

    def index
      contacts = ContactService.find_contacts(current_user)
      render json: contacts
    end

    def show
      render json: @contact
    end

    def create
      contact = ContactService.create_contact(current_user, contact_params)
      if contact
        render json: contact, status: :created
      else
        render json: { errors: contact.errors }, status: :unprocessable_entity
      end
    end

    def update
      if ContactService.update_contact(current_user, @contact, contact_params)
        render json: @contact
      else
        render json: { errors: @contact.errors }, status: :unprocessable_entity
      end
    end

    def destroy
      ContactService.delete_contact(current_user, @contact)
      head :no_content
    end

    private

    def set_contact
      @contact = ContactService.find_contact(current_user, params[:id])
    end

    def contact_params
      params.require(:contact).permit(:name, :cpf, :phone, :address, :cep, :latitude, :longitude)
    end
  end
end
