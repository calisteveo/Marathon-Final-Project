Marathon::Application.routes.draw do
  
  resources :runs, :users, :sessions, :journeys

  get "/" => "runs#index"

  get "/signup" => "users#new"
  delete "/signout", to: "sessions#destroy"
  get "/signin" => "sessions#new"

end
