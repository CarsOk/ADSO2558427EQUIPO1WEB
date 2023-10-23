class OrdersController < ApplicationController
    before_action :authenticate_user!

    def new
      @order = current_user.orders.build
    end
  
    def edit
        @order = current_user.orders.find(params[:id])
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
        redirect_to shops_path, notice: 'Orden creada con éxito.'
      else
        render :new
      end
    end
  
    def index
      @orders = current_user.orders
    end
  
    private
  
    def order_params
      params.require(:order).permit(:total)
    end
end
