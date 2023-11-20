class Inventory < ApplicationRecord
    belongs_to :product
    validates :product_id, presence: true
    validates :quantity, presence: true

    private
  
    def json_request?
      request.format.json?
    end
end
