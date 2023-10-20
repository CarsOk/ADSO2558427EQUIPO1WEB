class CardsController < ApplicationController
  layout 'shops'  
  before_action :authenticate_user!

  def show
    @order_items = current_order.order_items
  end

  def custom_action
    # Tu código aquí
    render layout: 'shops' 
  end
end
