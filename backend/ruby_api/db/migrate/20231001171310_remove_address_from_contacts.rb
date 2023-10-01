class RemoveAddressFromContacts < ActiveRecord::Migration[5.2]
  def change
    remove_column :contacts, :address, :string
  end
end
