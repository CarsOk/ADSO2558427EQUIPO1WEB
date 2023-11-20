class ShopsController < ApplicationController
  layout 'shops'
  before_action :authenticate_user!

  def index
    @products = Product.all
    @orders = Order.where(created_at: Date.today.beginning_of_day..Date.today.end_of_day)
  end
  
  def custom_action
    render layout: 'shops' 
  end
end