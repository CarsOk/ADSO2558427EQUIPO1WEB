class SessionsController < ApplicationController
  before_action :authenticate_user!

  def index
    unless current_user.admin?
      redirect_to shops_path
    end

    @orders = current_user.orders
    @statistics = Order.statistics
    @daily_orders = @statistics[:daily_orders]
    @weekly_orders = @statistics[:weekly_orders]
    @monthly_orders = @statistics[:monthly_orders]
    @total_orders = @statistics[:total_orders]

    @total_daily_orders = Order.total_daily_orders
    @total_weekly_orders = Order.total_weekly_orders
    @total_monthly_orders = Order.total_monthly_orders

    @top_selling_products = Product.order(sold_count: :desc).limit(3)
  end
end
