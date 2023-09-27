Rails.application.routes.draw do
  devise_for :users

  resource :sessions
  root to: 'sessions#home'
  

end
