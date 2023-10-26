class AddColumnsToOrders < ActiveRecord::Migration[6.1]
  def change
    add_column :orders, :name, :string
    add_column :orders, :residential, :string
    add_column :orders, :tower, :string
    add_column :orders, :apartment, :string
    add_column :orders, :payment_method, :string
  end
end
