Rails.application.routes.draw do

  namespace :api do
    resources :contacts, only: [:index, :show, :create, :update, :destroy]
    resources :users, only: [:create, :destroy]
    resources :authentication, only: [] do
      collection do
        post 'login'
        post 'logout'
      end
    end
  end
end
