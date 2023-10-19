class Product < ApplicationRecord
    has_many :order_items
    has_many :orderables
    has_many :carts, through: :orderables
       
    mount_uploader :image, ImageUploader
    validates :title, :price, :image, :description, :category, presence: true
end
