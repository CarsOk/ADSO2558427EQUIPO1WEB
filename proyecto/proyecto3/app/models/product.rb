class Product < ApplicationRecord
  has_many :order_products
  has_one :inventory
  has_many :orders, through: :order_products
  
  validates :title, :price, :image, :description , :category, presence: true

  mount_uploader :image, ImageUploader
    
  def increment_sold_count(quantity)
    self.update(sold_count: self.sold_count + quantity)
  end

  

  private

    def json_request?
      request.format.json?
    end
end
