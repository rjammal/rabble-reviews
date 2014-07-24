Rails.application.routes.draw do
  
  root to: "static_pages#root"

  resource :session, only: [:create, :new, :destroy]
  resources :users

  namespace :api, default: :json do 
    resources :games, except: [:new, :edit]
    resources :reviews, except: [:new, :edit]
  end

end
