Rails.application.routes.draw do

  devise_for :users

  resources :secciones do
    resources :productos, module: :secciones
  end
  
  root to: 'home#index'

end
