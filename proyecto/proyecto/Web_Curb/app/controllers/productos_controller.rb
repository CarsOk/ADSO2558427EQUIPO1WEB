class ProductosController < ApplicationController
  def index
    @productos = Producto.all
    respond_to do |format|
      format.html { @productos }
      format.json { render(json: @productos) }
    end
  end
end
