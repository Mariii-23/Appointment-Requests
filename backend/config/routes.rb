Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  post '/login', to: 'authentication#login'
  post '/logout', to: 'authentication#logout'

  resources :nutritionists, only: [:index, :show] do
    collection do
      get 'search'
    end
  end

  resources :services, only: [:index, :show, :create]

  resources :appointments, only: [:create, :index, :update, :show] do
    member do
      patch :update_status
    end
  end

end
