Rails.application.routes.draw do
  devise_for :users
  resources :products
  resource :sessions
  resource :cards, only:[:show]
  resources :shops, only:[:index, :show]
  resources :order_items

  root to: 'shops#index'
  

end
