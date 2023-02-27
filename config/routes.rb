Rails.application.routes.draw do
  resources :edges
  resources :nodes
  resources :collaborations
  resources :maps
  resources :users

  get '/maps/:id/nodes', to: 'maps#nodes'
  get '/maps/:id/edges', to: 'maps#edges'

  post '/maps/:map_id/nodes', to: 'nodes#create'
  post '/maps/:map_id/edges', to: 'edges#create'
end
