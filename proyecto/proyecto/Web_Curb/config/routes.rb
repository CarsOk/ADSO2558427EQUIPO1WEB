Rails.application.routes.draw do
  root 'home#Inicio'
  resources :productos
end
