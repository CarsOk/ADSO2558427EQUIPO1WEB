class SeccionesController < ApplicationController
  def index
    @secciones = Seccion.all
    puts @secciones
  end
end
