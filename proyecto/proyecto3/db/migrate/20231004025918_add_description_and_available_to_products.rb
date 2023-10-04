class AddDescriptionAndAvailableToProducts < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :description, :string
    add_column :products, :available, :boolean
  end
end
