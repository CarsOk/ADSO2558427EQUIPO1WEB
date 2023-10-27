class InventoriesController < ApplicationController
  def index
    if current_user.admin?
      @inventories = Inventory.all
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
        redirect_to inventories_path, notice: "Inventory was successfully updated."
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

      redirect_to inventories_path, notice: "Inventory was successfully deleted."
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
    end
  end

  private

  def inventory_params
    params.require(:inventory).permit(:product_id, :quantity)
  end
end
