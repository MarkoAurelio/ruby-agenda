module Api
  class ContactsController < ApiController
    include HTTParty
    before_action :set_contact, only: [:show, :update, :destroy]

    def index
      contacts = ContactService.find_contacts(current_user)
      render json: contacts, each_serializer: ContactSerializer
    end

    def show
      render json: @contact, serializer: ContactSerializer
    end

    def create
      contact = ContactService.create_contact(current_user, contact_params)
      if contact.save
        render json: contact, status: :created, serializer: ContactSerializer
      else
        render json: { errors: contact.errors }, status: :unprocessable_entity
      end
    end

    def update
      if ContactService.update_contact(@contact, contact_params)
        render json: @contact, serializer: ContactSerializer
      else
        render json: { errors: @contact.errors }, status: :unprocessable_entity
      end
    end

    def destroy
      ContactService.delete_contact(@contact)
      head :no_content
    end

    def search_address
      address_data = fetch_address_from_via_cep(address_params[:cep])
      render json: address_data
    end

    private

    def set_contact
      @contact = ContactService.find_contact(current_user, params[:id])
    end

    def contact_params
      params.require(:contact).permit(:name, :cpf, :phone, :street, :neighborhood, :number, :city, :state, :complement, :cep)
    end

    def address_params
      params.permit(:cep)
    end

    def fetch_address_from_via_cep(cep)
      begin
        response = HTTParty.get("https://viacep.com.br/ws/#{cep}/json/")

        if response.success?
          JSON.parse(response.body)
        else
          { error: 'CEP não encontrado' }
        end
      rescue StandardError => e
        { error: 'Erro ao buscar CEP' }
      end
    end
  end
end
