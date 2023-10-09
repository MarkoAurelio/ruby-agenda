require 'rails_helper'

RSpec.describe Api::ContactsController, type: :controller do
  describe 'GET #index' do
    let!(:user) { create(:user) }

    before do
      request.headers['Authorization'] = "Bearer #{JsonWebToken.encode(user_id: user.id)}"
    end

    context 'with valid parameters' do
      it 'creates a new contact' do
        contact_params = {
          name: Faker::Name.name,
          cpf: Faker::IDNumber.brazilian_citizen_number(formatted: true),
          phone: Faker::PhoneNumber.phone_number,
          street: Faker::Address.street_name,
          neighborhood: Faker::Address.community,
          number: Faker::Address.building_number,
          city: Faker::Address.city,
          state: Faker::Address.state_abbr,
          complement: Faker::Address.secondary_address,
          cep: Faker::Address.zip_code
        }

        post :create, params: { contact: contact_params }
        expect(response).to have_http_status(:created)

        new_contact = user.contacts.last
        expect(new_contact.name).to eq(contact_params[:name])
        expect(new_contact.cpf).to eq(contact_params[:cpf])
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new contact' do
        invalid_contact_params = {
          name: 'Invalid Contact'
        }

        post :create, params: { contact: invalid_contact_params }
        expect(response).to have_http_status(:unprocessable_entity)

        expect(user.contacts.count).to eq(0)
      end
    end
  end
end
