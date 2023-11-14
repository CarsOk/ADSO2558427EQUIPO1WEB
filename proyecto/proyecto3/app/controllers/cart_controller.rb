class CartController < ApplicationController
  before_action :authenticate_user!
  def show
    @render_cart = false
  end

  def add
    @product = Product.find_by(id: params[:id])
    quantity = params[:quantity].to_i
    current_orderable = @cart.orderables.find_by(product_id: @product.id)
  
    if current_orderable
      current_orderable.update(quantity: quantity)
    else
      @cart.orderables.create(product: @product, quantity: quantity)
    end
  
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [turbo_stream.replace('cart',
                                                   partial: 'cart/cart',
                                                   locals: { cart: @cart }),
                              turbo_stream.replace(@product)]
      end
      format.html { redirect_to shops_path }
    end
  end
  
    def remove
    Orderable.find_by(id: params[:id]).destroy
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.replace('cart',
                                                  partial: 'cart/cart',
                                                  locals: { cart: @cart })
      end
      format.html { redirect_to shops_path }
    end
  end
  
  def finish_order
    order = current_user.orders.create(total: @cart.total)
    
    errors = []
  
    @cart.orderables.each do |orderable|
      product = orderable.product
      quantity = orderable.quantity
  
      inventory = Inventory.find_by(product_id: product.id)
  
      if inventory.nil? || inventory.quantity < quantity
        errors << "No hay suficiente inventario disponible para el producto '#{product.title}'"
      else
        order.order_products.create(product: product, quantity: quantity)
        inventory.update(quantity: inventory.quantity - quantity)
  
        product.update(available: (inventory.quantity - quantity) > 0)
      end
    end
  
    if errors.empty?
      order.update(order_params.merge(estado: "En Cocina"))
      @cart.orderables.destroy_all
      flash[:notice] = 'Orden finalizada con éxito. Una nueva orden ha sido creada.'
      redirect_to shops_path
    else
      @cart.orderables.reload
      flash[:alert] = errors.join(', ')
      redirect_to shops_path
    end
  end
  
  
  
  private
  
  def order_params
    params.permit(:name, :residential, :tower, :apartment, :payment_method)
  end
  
end