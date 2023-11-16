class InventoriesController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :authenticate_user!, if: -> { request.format.json? }
  skip_before_action :verify_authenticity_token, if: -> { self.json_request? }


  def index
    if request.format.json?
      @inventories = Inventory.all
      render json: @inventories.as_json(include: :product)
    else
      if current_user && current_user.admin?
        @inventories = Inventory.includes(:product).order(quantity: :desc)
        @products = Product.all
      else
        redirect_back(fallback_location: root_path, alert: 'No tienes permisos para acceder aquí.')
      end
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
    respond_to do |format|
      @inventory = Inventory.find(params[:id])
      if @inventory.update(inventory_params)
        product = Product.find(@inventory.product_id)
        available = @inventory.quantity.positive?
        product.update(available: available)

        format.html { redirect_to inventories_path, notice: "Inventario actualizado exitosamente." }
        format.json { render json: @inventory }
      else 
        format.html { render :edit }
        format.json { render json: @inventory.errors, status: :unprocessable_entity }
      end
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
  
  def json_request?
    self.request.format.json?
  end
end
