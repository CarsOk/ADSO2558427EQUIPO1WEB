class ChangeProductIdTypeInInventories < ActiveRecord::Migration[6.1]
  def change
    change_column :inventories, :product_id, 'bigint USING CAST(product_id AS bigint)'
  end
end
