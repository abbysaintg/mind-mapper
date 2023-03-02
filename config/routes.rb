Rails.application.routes.draw do
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    get '/logged_in', to: 'sessions#is_logged_in?'

    resources :users, only: [:index, :show, :create, :update, :destroy] do
      resources :maps, only: [:index, :show, :create, :update, :destroy] do
        resources :nodes, only: [:index, :show, :create, :update, :destroy]
        resources :lines, only: [:index, :show, :create, :update, :destroy]
      end
    end
  end

#### ROUTES ####

# login          POST   /login(.:format)                                                                                  sessions#create
# logout         DELETE /logout(.:format)                                                                                 sessions#destroy
# logged_in      GET    /logged_in(.:format)                                                                              sessions#is_logged_in?

# user_map_nodes GET    /users/:user_id/maps/:map_id/nodes(.:format)                                                      nodes#index
#                POST   /users/:user_id/maps/:map_id/nodes(.:format)                                                      nodes#create
# user_map_node  GET    /users/:user_id/maps/:map_id/nodes/:id(.:format)                                                  nodes#show
#                PATCH  /users/:user_id/maps/:map_id/nodes/:id(.:format)                                                  nodes#update
#                PUT    /users/:user_id/maps/:map_id/nodes/:id(.:format)                                                  nodes#update
#                DELETE /users/:user_id/maps/:map_id/nodes/:id(.:format)                                                  nodes#destroy

# user_map_lines GET    /users/:user_id/maps/:map_id/lines(.:format)                                                      lines#index
#                POST   /users/:user_id/maps/:map_id/lines(.:format)                                                      lines#create
# user_map_line  GET    /users/:user_id/maps/:map_id/lines/:id(.:format)                                                  lines#show
#                PATCH  /users/:user_id/maps/:map_id/lines/:id(.:format)                                                  lines#update
#                PUT    /users/:user_id/maps/:map_id/lines/:id(.:format)                                                  lines#update
#                DELETE /users/:user_id/maps/:map_id/lines/:id(.:format)                                                  lines#destroy

# user_maps      GET    /users/:user_id/maps(.:format)                                                                    maps#index
#                POST   /users/:user_id/maps(.:format)                                                                    maps#create
# user_map       GET    /users/:user_id/maps/:id(.:format)                                                                maps#show
#                PATCH  /users/:user_id/maps/:id(.:format)                                                                maps#update
#                PUT    /users/:user_id/maps/:id(.:format)                                                                maps#update
#                DELETE /users/:user_id/maps/:id(.:format)                                                                maps#destroy

# users          GET    /users(.:format)                                                                                  users#index
#                POST   /users(.:format)                                                                                  users#create
# user           GET    /users/:id(.:format)                                                                              users#show
#                PATCH  /users/:id(.:format)                                                                              users#update
#                PUT    /users/:id(.:format)                                                                              users#update
#                DELETE /users/:id(.:format)                                                                              users#destroy
