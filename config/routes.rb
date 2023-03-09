Rails.application.routes.draw do

    resources :users, only: [:show, :create] do
      resources :maps, only: [:index, :show, :create, :update, :destroy] do
        resources :nodes, only: [:index, :show, :create, :update, :destroy]
        resources :lines, only: [:index, :show, :create, :update, :destroy]
      end
    end

    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    get '/logged_in', to: 'sessions#is_logged_in?'

    # handles all other GET requests by sending them to a special FallbackController
    get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
