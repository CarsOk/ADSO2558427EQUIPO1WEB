class AddSoldCountToProducts < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :sold_count, :integer, default: 0
  end
end
