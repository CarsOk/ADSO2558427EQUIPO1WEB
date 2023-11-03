Rails.application.routes.draw do
  get 'cart', to: 'cart#show'
  post 'cart/add'
  post 'cart/remove'
  devise_for :users
  resources :products
  resources :inventories, except: [:show] do
    member do
      patch 'update_quantity', to: 'inventories#update'
    end
  end  resources :orders do
    get 'filter', on: :collection
    member do
      get 'generate_invoice', format: 'pdf'
    end
  end
  resource :sessions, only: [:index]
  resource :cards, only: [:show]
  resources :shops, only: [:index, :show]
  root to: 'sessions#index'
  post 'cart/finish_order', to: 'cart#finish_order', as: :finish_order_cart_index
end
