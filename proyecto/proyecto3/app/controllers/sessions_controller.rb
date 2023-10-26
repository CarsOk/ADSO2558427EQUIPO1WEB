class SessionsController < ApplicationController
  before_action :authenticate_user!

  def index
    @orders = current_user.orders
    @total_orders = @orders.sum(&:total)
  end
  
end
