class ShopsController < ApplicationController
  layout 'shops'
  before_action :authenticate_user!

  def index
    @products = Product.all
    @order_item = current_order.order_items.new
  end

  def show
    @product = Product.find(params[:id])
  end
  def custom_action
    # Tu código aquí
    render layout: 'shops' 
  end
end
