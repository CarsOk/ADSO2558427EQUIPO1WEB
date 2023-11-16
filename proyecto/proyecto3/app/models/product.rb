class Product < ApplicationRecord
  has_many :order_products
  has_many :inventories, dependent: :destroy
  has_many :orders, through: :order_products
  
  mount_uploader :image, ImageUploader
    
  def increment_sold_count(quantity = 1)
    self.update(sold_count: self.sold_count + quantity)
  end

  private

    def json_request?
      request.format.json?
    end
end
