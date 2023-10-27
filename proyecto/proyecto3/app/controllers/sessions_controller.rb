class SessionsController < ApplicationController
  before_action :authenticate_user!

  def index
    unless current_user.admin?
      redirect_to shops_path
    end
    @orders = current_user.orders
    @total_orders = @orders.sum(&:total)
    
  end
  
end
