Rails.application.routes.draw do

  devise_for :users
  get "home/index"
  get "home/minor"

  resources :secciones

  root to: 'home#index'

end
