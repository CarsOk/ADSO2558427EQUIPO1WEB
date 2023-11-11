class Order < ApplicationRecord
  belongs_to :user
  has_many :order_products
  has_many :products, through: :order_products
  before_create :assign_daily_order_number

  def self.daily_report(date)
    orders = where(created_at: date.beginning_of_day..date.end_of_day)
    total_amount = orders.sum(:total)
    { orders: orders, total_amount: total_amount }
  end

  private

  def assign_daily_order_number
    today_orders_count = Order.where(created_at: Time.current.beginning_of_day..Time.current.end_of_day).count
    self.order_number = today_orders_count + 1
  end
end

