Rails.application.routes.draw do
  
  root to: "sessions#new"

  resource :session, only: [:create, :new, :destroy]
  resources :users

  namespace :api, default: :json do 
    resources :games, except: [:new, :edit]
    resources :reviews, except: [:new, :edit]
  end

end
