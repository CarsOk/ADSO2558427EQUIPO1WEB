class CreateSecciones < ActiveRecord::Migration[6.0]
  def change
    create_table :secciones do |t|
      t.string :nombre

      t.timestamps
    end
  end
end
