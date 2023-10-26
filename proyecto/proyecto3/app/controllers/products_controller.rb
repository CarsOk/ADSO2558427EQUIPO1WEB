class ProductsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_product, only: %i[show edit update destroy]
  skip_before_action :authenticate_user!, if: -> { request.format.json? }
  skip_before_action :verify_authenticity_token, if: -> { self.json_request? }

  def index
    if request.format.json?
      @products = Product.all
      render json: @products
    else
      if current_user && current_user.admin?
        @products = Product.all
        respond_to do |format|
          format.html
        end
      else
        redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
      end
    end
  end

  def show
    if request.format.json?
      @product = Product.find(params[:id])
      render json: @product
    else
      if current_user && current_user.admin?
        @product = Product.find(params[:id])
        respond_to do |format|
          format.html
        end
      else
        redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aquí.")
      end
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
        format.html { redirect_to products_path, notice: "Product was successfully updated." }
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

  def json_request?
    self.request.format.json?
  end
end
