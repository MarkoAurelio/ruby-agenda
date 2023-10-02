require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  describe 'POST #create' do
    context 'with valid parameters' do
      let(:valid_params) do
        {
          user: {
            name: 'Dev Marko',
            email: 'marko@dev.com',
            password: 'abc@123'
          }
        }
      end

      it 'creates a new user' do
        post :create, params: valid_params
        expect(response).to have_http_status(:created)
        expect(User.count).to eq(1)
      end

      it 'returns the user data' do
        post :create, params: valid_params
        expect(response).to have_http_status(:created)
        user = User.last
        expect(JSON.parse(response.body)).to eq(
          {
            'name' => user.name,
            'email' => user.email,
            'token' => JsonWebToken.encode(user_id: user.id)
          }
        )
      end
    end

    context 'with invalid parameters' do
      let(:invalid_params) do
        {
          user: {
            name: 'Dev Marko',
            email: 'marko@dev.com',
            password: 'abc'
          }
        }
      end

      it 'does not create a new user' do
        post :create, params: invalid_params
        expect(response).to have_http_status(:unprocessable_entity)
        expect(User.count).to eq(0)
      end

      it 'returns validation errors' do
        post :create, params: invalid_params
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)).to eq(
          {
            'errors' => {
              'email' => ['is not an email'],
              'password' => ['Password is too short (minimum is 6 characters)']
            }
          }
        )
      end
    end
  end
end
