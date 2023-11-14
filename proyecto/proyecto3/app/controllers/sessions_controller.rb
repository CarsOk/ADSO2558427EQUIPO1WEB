class SessionsController < ApplicationController
  before_action :authenticate_user!

  def index
    unless current_user.admin?
      redirect_to shops_path
    end

    @orders = current_user.orders
    @statistics = Order.daily_statistics

  end
end
