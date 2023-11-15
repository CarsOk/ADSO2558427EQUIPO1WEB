require 'axlsx'

class OrdersController < ApplicationController
  before_action :authenticate_user!, unless: -> { request.format.json? }
  skip_before_action :verify_authenticity_token, only: [:create]


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
    @order = Order.find(params[:id])
    @products = @order.products
    respond_to do |format|
      format.html
      format.json { render json: { order: @order, products: @products } }
    end
  end


  def destroy
    if current_user.admin?
      @order = current_user.orders.find(params[:id])
      @order.order_products.destroy_all  
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
    user_id = 1
    user = User.find_by(id: user_id)
  
    if user
      @order = user.orders.build(order_params)
      total = 0
      estado = "En Cocina"
  
      if @order.save
        associated_products = []
  
        if params[:products].present?
          params[:products].each do |product_params|
            product_id = product_params[:id]
            quantity = product_params[:quantity]
  
            product = Product.find_by(id: product_id)
  
            if product && quantity.to_i > 0
              subtotal = product.price * quantity.to_i
              total += subtotal
  
              order_product = @order.order_products.create(product_id: product_id, quantity: quantity)
              associated_products << { product: product, quantity: order_product.quantity }
  
              inventory = Inventory.find_by(product_id: product.id)
              if inventory
                new_quantity = inventory.quantity - quantity.to_i
                inventory.update(quantity: new_quantity)
                product.update(available: new_quantity > 0)
              end
            end
          end
        end
  
        @order.update(total: total, estado: estado)
  
        respond_to do |format|
          format.html { redirect_to orders_path, notice: 'Orden creada con éxito.' }
          format.json { render json: { order: @order, products: associated_products }, status: :created, location: @order }
        end
      else
        respond_to do |format|
          format.html { render :new }
          format.json { render json: @order.errors, status: :unprocessable_entity }
        end
      end
    else
      respond_to do |format|
        format.json { render json: { error: 'Usuario no encontrado.' }, status: :not_found }
      end
    end
  end
  
  
  

  def index
    if request.format.json?
      @orders = Order.order(created_at: :desc)
      render json: @orders
    else
      if current_user && current_user.admin?
        @orders = Order.order(created_at: :desc).paginate(page: params[:page], per_page: 15)
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
  
    if @filter.present?
      orders = orders.where(estado: @filter)
    end
  
    if @created_at_start.present?
      start_date = Date.parse(@created_at_start)
      orders = orders.where('created_at >= ?', start_date)
    end
  
    if @created_at_end.present?
      end_date = Date.parse(@created_at_end)
      orders = orders.where('created_at <= ?', end_date.end_of_day)
    end
    
    @orders = orders.order(created_at: :desc).paginate(page: params[:page], per_page: 15)

    respond_to do |format|
      format.html { render :index }
      format.json { render json: @orders }
    end
  end
  
  def generate_invoice
    @order = Order.find(params[:id])
    respond_to do |format|
      format.pdf do
        render pdf: "generate_invoice", template: "orders/generate_invoice"
      end
    end
  end

  def daily_report
    date = params[:date] ? Date.parse(params[:date]) : Date.today
    result = Order.daily_report(date)
    @orders = result[:orders]
    @total_amount = result[:total_amount]
  end

  def orders_of_the_day
    @orders = Order.where(created_at: Date.today.beginning_of_day..Date.today.end_of_day)
  end

  def accounting_report
    start_date = params[:start_date]
    end_date = params[:end_date]

    if start_date.present? && end_date.present?
      @orders = Order.where(created_at: start_date.to_date.beginning_of_day..end_date.to_date.end_of_day)
      @total_amount = @orders.sum(:total)
    elsif start_date.present?
      @orders = Order.where(created_at: start_date.to_date.beginning_of_day..start_date.to_date.end_of_day)
      @total_amount = @orders.sum(:total)
    else
      @orders = []
      @total_amount = 0
    end
  end
  
    
  def export_excel
    start_date = params[:start_date]
    end_date = params[:end_date]
  
    if start_date.present?
      start_date = start_date.to_date.beginning_of_day
    end
  
    if end_date.present?
      end_date = end_date.to_date.end_of_day
    end
  
    @orders = Order.where(created_at: start_date..end_date)
  
    respond_to do |format|
      format.xlsx do
        template_path = File.join(Rails.root, 'lib', 'assets', 'plantilla.xlsx')
        excel = Axlsx::Package.new
        workbook = excel.workbook
  
        workbook.add_worksheet(name: 'Ordenes') do |sheet|
          sheet.add_row ['Fecha', 'Producto', 'Cantidad', 'Valor', 'Total', 'Método de Pago']
  
          @orders.each do |order|
            order.order_products.each do |order_product|
              sheet.add_row [order.created_at.to_date, order_product.product.title, order_product.quantity, order_product.product.price, order_product.product.price * order_product.quantity, order.payment_method]
            end
          end
        end
  
        tmpfile = Tempfile.new(['ordenes', '.xlsx'])
        excel.serialize(tmpfile.path)
  
        send_file tmpfile.path, filename: 'ordenes.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', disposition: 'attachment'
      end
    end
  end
  
  
  
  
  

  private

  def order_params
    params.require(:order).permit(:total, :name, :residential, :tower, :apartment, :payment_method, :estado)
  end
end
