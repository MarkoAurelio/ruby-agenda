Rails.application.routes.draw do

  namespace :api do
    resources :contacts, only: [:index, :show, :create, :update, :destroy] do
      collection do
        get 'search_address/:cep', to: 'contacts#search_address'
      end
    end
    resources :users, only: [:create] do
      collection do
        patch 'destroy', to: 'users#destroy'
      end
    end
    resources :authentication, only: [:create] do
      collection do
        delete 'logout'
      end
    end
  end
end
