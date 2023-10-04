class Product < ApplicationRecord
    has_many :order_items
    mount_uploader :image, ImageUploader

end
