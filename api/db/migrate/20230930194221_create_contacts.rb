class CreateContacts < ActiveRecord::Migration[5.2]
  def change
    create_table :contacts do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.string :cpf
      t.string :phone
      t.string :address
      t.string :cep
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
