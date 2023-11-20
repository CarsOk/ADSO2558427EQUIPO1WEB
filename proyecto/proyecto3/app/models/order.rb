class Order < ApplicationRecord
  belongs_to :user
  has_many :order_products
  has_many :products, through: :order_products

  accepts_nested_attributes_for :order_products
  before_create :assign_daily_order_number

  def self.daily_report(date)
    orders = where(created_at: date.beginning_of_day..date.end_of_day)
    total_amount = orders.sum(:total)
    { orders: orders, total_amount: total_amount }
  end

  def self.statistics
    {
      total_orders: sum(:total),
      daily_orders: daily_order_counts,
      graphic_orders: group("DATE(created_at)").count,
      graphic_total: group("DATE(created_at)").sum(:total),
      weekly_orders: weekly_order_counts,
      monthly_orders: monthly_order_counts
    }
  end

  def complete_order
    self.order_products.each do |order_product|
      order_product.product.increment(:sold_count, order_product.quantity).save
    end
  end

  private

  def self.daily_order_counts
    where(created_at: Date.today.all_day).count
  end

  def self.weekly_order_counts
    where(created_at: Date.today.beginning_of_week..Date.today.end_of_week).count
  end

  def self.monthly_order_counts
    where(created_at: Date.today.beginning_of_month..Date.today.end_of_month).count
  end

  def self.total_daily_orders
    where(created_at: Date.today.all_day).sum(:total)
  end

  def self.total_weekly_orders
    where(created_at: Date.today.beginning_of_week..Date.today.end_of_week).sum(:total)
  end

  def self.total_monthly_orders
    where(created_at: Date.today.beginning_of_month..Date.today.end_of_month).sum(:total)
  end

  def assign_daily_order_number
    today_orders_count = Order.where(created_at: Time.current.beginning_of_day..Time.current.end_of_day).count
    self.order_number = today_orders_count + 1
  end
end

