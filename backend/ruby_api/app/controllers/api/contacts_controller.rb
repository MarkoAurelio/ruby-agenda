module Api
  class ContactsController < ApiController
    before_action :set_contact, only: [:show, :destroy]

    def index
      contacts = current_user.contacts
      render json: contacts
    end

    def show
      render json: @contact
    end

    def create
      contact = current_user.contacts.new(contact_params)
      if contact.save
        render json: contact, status: :created
      else
        render json: { errors: contact.errors }, status: :unprocessable_entity
      end
    end

    def destroy
      @contact.destroy
      head :no_content
    end

    private

    def set_contact
      @contact = current_user.contacts.find(params[:id])
    end

    def contact_params
      params.require(:contact).permit(:name, :cpf, :phone, :address, :cep, :latitude, :longitude)
    end
  end
end
