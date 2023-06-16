class SeccionesController < ApplicationController
  def index
    # Lógica para mostrar todas las secciones
    @secciones = Seccion.all
  end

  def show
    # Lógica para mostrar una sección específica
    @seccion = Seccion.find(params[:id])
  end

  def new
    # Lógica para crear una nueva sección
    @seccion = Seccion.new
  end

  def create
    # Lógica para guardar una nueva sección
    @seccion = Seccion.new(seccion_params)

    if @seccion.save
      redirect_to seccion_path(@seccion)
    else
      render 'new'
    end
  end

  def edit
    # Lógica para editar una sección específica
    @seccion = Seccion.find(params[:id])
  end

  def update
    # Lógica para actualizar una sección específica
    @seccion = Seccion.find(params[:id])

    if @seccion.update(seccion_params)
      redirect_to seccion_path(@seccion)
    else
      render 'edit'
    end
  end

  def destroy
    # Lógica para eliminar una sección específica
    @seccion = Seccion.find(params[:id])
    @seccion.destroy

    redirect_to secciones_path
  end

  private

  def seccion_params
    params.require(:seccion).permit(:nombre)
  end
end
