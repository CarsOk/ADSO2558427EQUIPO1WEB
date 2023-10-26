class CartController < ApplicationController
  before_action :authenticate_user!
  def show
    @render_cart = false
  end

  def add
    @product = Product.find_by(id: params[:id])
    quantity = params[:quantity].to_i
    current_orderable = @cart.orderables.find_by(product_id: @product.id)
    if current_orderable && quantity > 0
      current_orderable.update(quantity:)
    elsif quantity <= 0
      current_orderable.destroy
    else
      @cart.orderables.create(product: @product, quantity:)
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

    @cart.orderables.each do |orderable|
      order.order_products.create(product: orderable.product, quantity: orderable.quantity)
    end
  
    @cart.orderables.destroy_all
    redirect_to shops_path, notice: 'Orden finalizada con éxito. Una nueva orden ha sido creada.'
  end
end