require 'rails_helper'

RSpec.describe Api::AuthenticationController, type: :controller do
  describe 'POST #create' do
    context 'with valid credentials' do
      let(:user) { create(:user, email: 'user@example.com', password: 'password123') }

      it 'returns a valid user data with a token' do
        post :create, params: { email: 'user@example.com', password: 'password123' }

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
