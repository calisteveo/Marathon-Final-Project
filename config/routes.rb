Marathon::Application.routes.draw do
  resources :users, :sessions, :journeys

  root to: "journeys#index"

  get "/signup" => "users#new"
  delete "/signout", to: "sessions#destroy"
  get "/signin" => "sessions#new"

end
