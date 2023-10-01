Rails.application.routes.draw do

  namespace :api do
    resources :contacts, only: [:index, :show, :create, :update, :destroy] do
      collection do
        get 'search_address/:cep', to: 'contacts#search_address'
      end
    end
    resources :users, only: [:create, :destroy]
    resources :authentication, only: [:create] do
      collection do
        delete 'logout'
      end
    end
  end
end
