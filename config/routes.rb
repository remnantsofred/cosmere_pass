Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # resources :locations, only: [:show]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create] 
    # resources :users, only: [:show, :update] do
    #   resources :reservations, only: [:index, :create, :destroy]
    #   resources :favorites, only: [:index, :create, :destroy]
    # end
    
    # resources :lesson_dates, only: [:index]
    # resources :locations, only: [:index, :show]
    resources :locations, only: [:show]
    # resources :locations, only: [:show] do
    #   resources :reviews, only: [:index, :create, :update, :destroy]
    # end
    resource :session, only: [:show, :create, :destroy]
    # resources :lessons, only: [:index, :show]
  end
  
  get '*path', to: 'static_pages#frontend'
end
