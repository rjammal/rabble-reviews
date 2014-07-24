Rails.application.routes.draw do
  
  root to: "static_pages#root"

  namespace :api, default: :json do 
    resource :session, only: [:create, :new, :destroy]
    resources :users
    resources :games, except: [:new, :edit]
    resources :reviews, except: [:new, :edit]
  end

end
