Rails.application.routes.draw do

  namespace :api do
    resources :contacts, only: [:index, :show, :create, :destroy]
    resources :users, only: [:create, :destroy]
    post 'login', to: 'authentication#login'
    post 'logout', to: 'authentication#logout'
  end
end
