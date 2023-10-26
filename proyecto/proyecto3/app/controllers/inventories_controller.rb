class InventoriesController < ApplicationController
  def index
    @inventories = Inventory.all
  end

  def new
    @inventory = Inventory.new
    @products = Product.all
  end

  def create
    @inventory = Inventory.new(inventory_params)

    existing_inventory = Inventory.find_by(product_id: @inventory.product_id)
    
    if existing_inventory
      flash[:error] = "Este producto ya se encuentra en el inventario."
      render :new
    elsif @inventory.save
      redirect_to inventories_path, notice: "Inventario creado exitosamente."
    else
      render :new
    end
  end

  def edit
    @inventory = Inventory.find(params[:id])
    @products = Product.all
  end

  def update
    @inventory = Inventory.find(params[:id])

    if @inventory.update(inventory_params)
      redirect_to inventories_path, notice: "Inventory was successfully updated."
    else
      render :edit
    end
  end

  def destroy
    @inventory = Inventory.find(params[:id])
    @inventory.destroy

    redirect_to inventories_path, notice: "Inventory was successfully deleted."
  end

  private

  def inventory_params
    params.require(:inventory).permit(:product_id, :quantity)
  end
end
