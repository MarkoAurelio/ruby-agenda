# == Schema Information
#
# Table name: contacts
#
#  id         :bigint           not null, primary key
#  user_id    :bigint
#  name       :string
#  cpf        :string
#  phone      :string
#  address    :string
#  cep        :string
#  latitude   :float
#  longitude  :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Contact < ApplicationRecord
  belongs_to :user

  geocoded_by :full_address
  after_validation :geocode

  def full_address
    "Rua #{street}, #{number} - #{city}, #{state}"
  end
end
