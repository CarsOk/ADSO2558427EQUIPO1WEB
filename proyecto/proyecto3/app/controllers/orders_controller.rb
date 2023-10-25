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

  private

  def order_params
    params.require(:order).permit(:total, :name, :residential, :tower, :apartment, :payment_method, :estado)
  end
end
