class ShopsController < ApplicationController
  layout 'shops'
  before_action :authenticate_user!

  def index
    @products = Product.all
    @order_item = current_order.order_items.new
    
    @order_items = current_order.order_items

  end
  def custom_action
    render layout: 'shops' 
  end
end