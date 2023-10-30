class OrdersController < ApplicationController
  before_action :authenticate_user!, unless: -> { request.format.json? }

  def new
    if current_user.admin?
      @order = current_user.orders.build
      respond_to do |format|
        format.html
        format.json { render json: @order }
      end
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
    end
  end

  def edit
    if current_user.admin?
      @order = current_user.orders.find(params[:id])
      @order_products = @order.order_products.includes(:product)
      respond_to do |format|
        format.html
        format.json { render json: { order: @order, order_products: @order_products } }
      end
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
    end
  end

  def show
    if current_user.admin?
      @order = Order.find(params[:id])
      @products = @order.products
      respond_to do |format|
        format.html
        format.json { render json: { order: @order, products: @products } }
      end
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
    end
  end

  def destroy
    if current_user.admin?
      @order = current_user.orders.find(params[:id])
      @order.destroy
      respond_to do |format|
        format.html { redirect_to orders_path, notice: 'Orden eliminada con éxito.' }
        format.json { head :no_content }
      end
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
    end
  end

  def create
    if current_user.admin?
      @order = current_user.orders.build(order_params)
      if @order.save
        @order_products.each do |order_product|
          product = Product.find(order_product[:product_id])
          quantity = order_product[:quantity].to_i
          # Aquí puedes realizar alguna lógica para manejar los productos de la orden
        end
        respond_to do |format|
          format.html { redirect_to shops_path, notice: 'Orden creada con éxito.' }
          format.json { render json: @order, status: :created, location: @order }
        end
      else
        respond_to do |format|
          format.html { render :new }
          format.json { render json: @order.errors, status: :unprocessable_entity }
        end
      end
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
    end
  end

  def index
    if request.format.json?
      @orders = current_user.orders.order(created_at: :desc)
    else
      if current_user && current_user.admin?
        @orders = current_user.orders.order(created_at: :desc)
        respond_to do |format|
          format.html
        end
      else
        redirect_back(fallback_location: root_path, alert: 'No tienes permisos para acceder aquí.')
      end
    end
  end

  def update
    @order = current_user.orders.find(params[:id])
    if @order.update(order_params)
      respond_to do |format|
        format.html { redirect_to orders_path, notice: 'Orden actualizada con éxito.' }
        format.json { render json: @order, status: :ok, location: @order }
      end
    else
      respond_to do |format|
        format.html { render :edit }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  def filter
    @filter = params[:filter]
    @created_at_start = params[:created_at_start]
    @created_at_end = params[:created_at_end]
  
    orders = current_user.orders
    orders = orders.where(estado: @filter) if @filter.present?
  
    if @created_at_start.present?
      start_date = Date.parse(@created_at_start)
      orders = orders.where('created_at >= ?', start_date)
    end
  
    if @created_at_end.present?
      end_date = Date.parse(@created_at_end)
      orders = orders.where('created_at <= ?', end_date.end_of_day)
    end
  
    @orders = orders
    render :index
  end
  
  private

  def order_params
    params.require(:order).permit(:total, :name, :residential, :tower, :apartment, :payment_method, :estado)
  end
end
