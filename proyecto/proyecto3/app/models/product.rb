class Product < ApplicationRecord
    has_many :order_items
    mount_uploader :image, ImageUploader
    validates :title, :price, :image, :description, :category, presence: true
    validates :title, :price, :description, :category, presence: true, if: -> { json_request? }

    private
  
    def json_request?
      request.format.json?
    end
end
