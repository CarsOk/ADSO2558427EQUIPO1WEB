class Secciones::ProductosController < ApplicationController
  before_action :set_seccion

  def index
    @productos = @seccion.productos.all
  end

  def new
    @producto = @seccion.productos.new
  end

  def create
    @producto = @seccion.productos.new(producto_params)
    if @producto.save
      redirect_to seccion_productos_path(@seccion)
    else
      render :new
    end
  end

  def show
    @producto = @seccion.productos.find(params[:id])
  end

  def edit
    @producto = @seccion.productos.find(params[:id])
  end

  private
  def set_seccion
    @seccion = Seccion.find(params[:seccion_id])
  end 
  def producto_params
    params.require(:producto).permit(:nombre, :precio)
  end
end
