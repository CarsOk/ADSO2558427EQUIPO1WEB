class CreateProductos < ActiveRecord::Migration[6.0]
  def change
    create_table :productos do |t|
      t.string :nombre
      t.integer :precio
      t.references :seccion, null: false, foreign_key: true

      t.timestamps
    end
  end
end
