class ShopsController < ApplicationController
  layout 'shops'
  before_action :authenticate_user!

  def index
    @products = Product.all
    @orders = Order.order(created_at: :desc)
  end
  
  def custom_action
    render layout: 'shops' 
  end
end