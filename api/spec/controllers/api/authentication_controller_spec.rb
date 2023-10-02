require 'rails_helper'

RSpec.describe Api::AuthenticationController, type: :controller do
  describe 'Seed DB' do
    before(:all) do
      Rails.application.load_seed
    end
  end

  describe 'POST #create' do
    context 'with valid credentials' do

      it 'returns a valid user data with a token' do
        post :create, params: { email: 'user@dev.com', password: 'abc@123' }

        expect(response).to have_http_status(:ok)

        data = JSON.parse(response.body)
        expect(data).to include('name', 'email', 'token')

        expect(data['name']).to eq(user.name)
        expect(data['email']).to eq(user.email)
      end
    end

    context 'with invalid credentials' do
      it 'returns an unauthorized error' do
        post :create, params: { email: 'invalid@example.com', password: 'wrongpassword' }

        expect(response).to have_http_status(:unauthorized)

        data = JSON.parse(response.body)
        expect(data).to include('error')
        expect(data['error']).to eq('Credenciais inválidas')
      end
    end
  end
end
