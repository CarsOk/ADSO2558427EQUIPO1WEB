class ProductsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_product, only: %i[ show edit update destroy ]

  # GET /products or /products.json
  def index
    if current_user.admin?
      @products = Product.all
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aqui.")
    end
  end


  # GET /products/1 or /products/1.json
  def show
    if current_user.admin?
      @product = Product.find(params[:id])
      else
        redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aqui.")
      end
  end

  # GET /products/new
  def new
    if current_user.admin?
    @product = Product.new
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aqui.")
    end
  end

  # GET /products/1/edit
  def edit
    if current_user.admin?
      @product = Product.find(params[:id])
      else
        redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aqui.")
      end
  end

  # POST /products or /products.json
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

  # PATCH/PUT /products/1 or /products/1.json
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

  # DELETE /products/1 or /products/1.json
  def destroy
    if current_user.admin?
      @product.destroy

      respond_to do |format|
        format.html { redirect_to products_url, notice: "Product was successfully destroyed." }
        format.json { head :no_content }
      end
    else
      redirect_back(fallback_location: root_path, alert: "No tienes permisos para acceder aqui.")
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def product_params
      params.require(:product).permit(:title, :price, :image, :description, :available, :category)
    end
end
