class ProductsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_product, only: %i[show edit update destroy]
  

  def index
    if current_user.admin?
      @products = Product.all
      respond_to do |format|
        format.html
        format.json { render json: @products }
      end
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
    end
  end

  def show
    if current_user.admin?
      @product = Product.find(params[:id])
      respond_to do |format|
        format.html
        format.json { render json: @product }
      end
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
    end
  end

  def new
    if current_user.admin?
      @product = Product.new
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
    end
  end

  def create
    @product = Product.new(product_params)

    respond_to do |format|
      if @product.save
        format.html { redirect_to product_url(@product), notice: "Product was successfully created." }
        format.json { render :show, status: :created, location: @product }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    if current_user.admin?
      @product = Product.find(params[:id])
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
    end
  end

  def update
    respond_to do |format|
      if @product.update(product_params)
        format.html { redirect_to product_url(@product), notice: "Product was successfully updated." }
        format.json { render :show, status: :ok, location: @product }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    if current_user.admin?
      @product.destroy

      respond_to do |format|
        format.html { redirect_to products_url, notice: "Product was successfully destroyed." }
        format.json { head :no_content }
      end
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
    end
  end

  private
  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:title, :price, :image, :description, :available, :category)
  end
end
