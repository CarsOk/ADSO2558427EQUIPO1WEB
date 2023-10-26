class AddEstadoToOrders < ActiveRecord::Migration[6.1]
  def change
    add_column :orders, :estado, :string
  end
end
