  class InventoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    if current_user.admin?
      @inventories = Inventory.order(quantity: :desc).all
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
    end
  end

  def new
    if current_user.admin?
      @inventory = Inventory.new
      @products = Product.all
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
    end
  end

  def create
    if current_user.admin?
      @inventory = Inventory.new(inventory_params)
  
      existing_inventory = Inventory.find_by(product_id: @inventory.product_id)
  
      if existing_inventory
        flash[:notice] = "Este producto ya se encuentra en el inventario."
        redirect_to inventories_path
      elsif @inventory.save
        product = Product.find(@inventory.product_id)
        product.update(inventory_quantity: @inventory.quantity)
        product.update(available: @inventory.quantity.positive?)
        redirect_to inventories_path, notice: "Inventario creado exitosamente."
      else
        render :new
      end
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
    end
  end
  

  def edit
    if current_user.admin?
      @inventory = Inventory.find(params[:id])
      @products = Product.all
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
    end
  end

  def update
    if current_user.admin?
      @inventory = Inventory.find(params[:id])
  
      if @inventory.update(inventory_params)
        product = Product.find(@inventory.product_id)
        available = @inventory.quantity.positive?
        product.update(available: available)
        redirect_to inventories_path, notice: "Inventario actualizado exitosamente."
      else
        render :edit
      end
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
    end
  end
  
  
  
  def destroy
    if current_user.admin?
      @inventory = Inventory.find(params[:id])
      @inventory.destroy

      product = Product.find(@inventory.product_id)
      product.update(inventory_quantity: nil)
      product.save

      redirect_to inventories_path, notice: "Inventario eliminado exitosamente."
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
    end
  end

  private

  def inventory_params
    params.require(:inventory).permit(:product_id, :quantity)
  end
end
