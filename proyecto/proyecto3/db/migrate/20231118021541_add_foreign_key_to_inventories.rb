class AddForeignKeyToInventories < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :inventories, :products, column: :product_id, primary_key: :id
  end
end
