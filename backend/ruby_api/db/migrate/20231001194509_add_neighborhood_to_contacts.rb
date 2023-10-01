class AddNeighborhoodToContacts < ActiveRecord::Migration[5.2]
  def change
    add_column :contacts, :neighborhood, :string
  end
end
