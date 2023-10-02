class AddAddressColumnsToContacts < ActiveRecord::Migration[5.2]
  def change
    add_column :contacts, :street, :string
    add_column :contacts, :number, :int
    add_column :contacts, :city, :string
    add_column :contacts, :state, :string
    add_column :contacts, :complement, :string
  end
end
