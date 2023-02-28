Rails.application.routes.draw do
  resources :edges
  resources :nodes
  resources :collaborations
  resources :maps
  resources :users

  get '/maps/:id/nodes', to: 'maps#nodes'
  get '/maps/:id/edges', to: 'maps#edges'

  get '/maps/:id/nodes/:node_id', to: 'maps#node'
  get '/maps/:id/edges/:edge_id', to: 'maps#edge'

  post '/maps/:id/nodes', to: 'maps#create_node'
  post '/maps/:id/edges', to: 'maps#create_edge'

  patch '/maps/:id/nodes/:node_id', to: 'maps#update_node'
  patch '/maps/:id/edges/:edge_id', to: 'maps#update_edge'

  delete '/maps/:id/nodes/:node_id', to: 'maps#destroy_node'
  delete '/maps/:id/edges/:edge_id', to: 'maps#destroy_edge'
end
