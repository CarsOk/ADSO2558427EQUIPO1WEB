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
      puts @products.inspect
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
