class OrdersController < ApplicationController
  before_action :authenticate_user!

  def new
    @order = current_user.orders.build
  end

  def edit
    @order = current_user.orders.find(params[:id])
    @order_products = @order.order_products.includes(:product)
  end

  def show
    @order = Order.find(params[:id])
    @products = @order.products
  end

  def destroy
    @order = current_user.orders.find(params[:id])
    @order.destroy
    redirect_to orders_path, notice: 'Orden eliminada con éxito.'
  end

  def create
    @order = current_user.orders.build(order_params)
    if @order.save
      @order_products.each do |order_product|
        product = Product.find(order_product[:product_id])
        quantity = order_product[:quantity].to_i
        # Aquí puedes realizar alguna lógica para manejar los productos de la orden
      end
      redirect_to shops_path, notice: 'Orden creada con éxito.'
    else
      render :new
    end
  end

  def index
    @orders = current_user.orders
  end

  def update
    @order = current_user.orders.find(params[:id])
    if @order.update(order_params)
      redirect_to orders_path, notice: 'Orden actualizada con éxito.'
    else
      render :edit
    end
  end

  def filter
    @filter = params[:filter]
    @created_at_date_start = params[:created_at_date_start]
    @created_at_time_start = params[:created_at_time_start]
    @created_at_date_end = params[:created_at_date_end]
    @created_at_time_end = params[:created_at_time_end]
  
    orders = current_user.orders
    orders = orders.where(estado: @filter) if @filter.present?
  
    if @created_at_date_start.present? && @created_at_time_start.present?
      start_datetime = DateTime.parse("#{@created_at_date_start} #{@created_at_time_start}")
      orders = orders.where('created_at >= ?', start_datetime)
    end
  
    if @created_at_date_end.present? && @created_at_time_end.present?
      end_datetime = DateTime.parse("#{@created_at_date_end} #{@created_at_time_end}")
      orders = orders.where('created_at <= ?', end_datetime)
    end
  
    @orders = orders
    render :index
  end
  
  
  
  private

  def order_params
    params.require(:order).permit(:total, :name, :residential, :tower, :apartment, :payment_method, :estado)
  end
end
