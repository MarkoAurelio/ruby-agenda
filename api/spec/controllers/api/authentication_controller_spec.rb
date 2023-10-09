require 'rails_helper'

RSpec.describe Api::AuthenticationController, type: :controller do
  describe 'POST #create' do
    context 'with valid credentials' do
      it 'returns a valid user data with a token' do
        user = User.create(name: 'User Dev', email: 'user@dev.com', password: 'abc@123')

        post :create, params: { email: 'user@dev.com', password: 'abc@123' }

        expect(response).to have_http_status(:ok)

        data = JSON.parse(response.body)
        expect(data).to include('name', 'email', 'token')

        expect(data['name']).to eq(user.name)
        expect(data['email']).to eq(user.email)
      end
    end

    context 'with invalid credentials' do
      it 'returns an error message' do
        post :create, params: { email: 'invalid_email@example.com', password: 'invalid_password' }

        expect(response).to have_http_status(:unauthorized)

        data = JSON.parse(response.body)
        expect(data).to include('error')
        expect(data['error']).to eq('Credenciais inválidas')
      end
    end
  end
end
