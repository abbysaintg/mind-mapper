Rails.application.routes.draw do
  resources :edges
  resources :nodes
  resources :collaborations
  resources :maps
  resources :users
end
