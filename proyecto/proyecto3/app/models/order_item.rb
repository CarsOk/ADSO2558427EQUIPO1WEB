class OrderItem < ApplicationRecord
    belongs_to :order
    belongs_to :product

    before_save :set_unit_price
    before_save :set_total

    def unit_price
        if persisted?
            self[:unit_price]
        else
            product.price
        end
    end

    def total
        if unit_price.nil? || quantity.nil?
          0
        else
          unit_price * quantity
        end
      end
      

    private

    def set_unit_price
        self[:unit_price] = unit_price
    end

    def set_total
        self[:total] = total * quantity
    end
end
