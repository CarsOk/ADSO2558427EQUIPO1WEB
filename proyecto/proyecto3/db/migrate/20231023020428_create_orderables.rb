class CreateOrderables < ActiveRecord::Migration[6.1]
  def change
    create_table :orderables do |t|
      t.belongs_to :product, null: false, foreign_key: true
      t.belongs_to :cart, null: false, foreign_key: true
      t.integer :quantity

      t.timestamps
    end
  end
end
