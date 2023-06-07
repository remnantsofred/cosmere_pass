Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update]
    # resources :favorites, only: [:index, :create, :destroy]
    resources :reservations, only: [:index, :show, :create, :destroy]
    resources :reviews, only: [:show, :create, :update, :destroy]
    resources :lesson_dates, only: [:index, :show, :create, :update, :destroy]
    resources :locations, only: [:index, :show] do
      resources :reviews, only: [:index]
    end

    resources :lessons, only: [:index, :show]
    resources :reviews, only: [:index, :show]
    
    resource :session, only: [:show, :create, :destroy]

  end
  
  get '*path', to: 'static_pages#frontend'
end
