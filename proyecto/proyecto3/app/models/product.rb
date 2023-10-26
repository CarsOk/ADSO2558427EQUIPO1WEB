class Product < ApplicationRecord
  has_many :order_products
  has_many :orders, through: :order_products
  
  mount_uploader :image, ImageUploader
  validates :title, :price, :image, :description, :category, presence: true
    
    private
  
    def json_request?
      request.format.json?
    end
end
