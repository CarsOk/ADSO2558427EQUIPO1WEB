class Product < ApplicationRecord
    has_many :order_items
    mount_uploader :image, ImageUploader
    validates :title, :price, :image, :description, :available, :category, presence: true
end
