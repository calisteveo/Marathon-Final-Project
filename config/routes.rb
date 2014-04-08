Marathon::Application.routes.draw do
  get "runs/index"
  resources :users, :sessions, :journeys

  root to: "sessions#new"

  get "/signup" => "users#new"
  delete "/signout", to: "sessions#destroy"
  get "/signin" => "sessions#new"

end
