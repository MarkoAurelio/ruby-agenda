# == Schema Information
#
# Table name: contacts
#
#  id           :bigint           not null, primary key
#  user_id      :bigint
#  name         :string
#  cpf          :string
#  phone        :string
#  cep          :string
#  latitude     :float
#  longitude    :float
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  street       :string
#  number       :integer
#  city         :string
#  state        :string
#  complement   :string
#  neighborhood :string
#
class Contact < ApplicationRecord
  belongs_to :user
  validates :name, :cpf, :phone, :street, :number, :neighborhood, :cep, :city, presence: true
  validate :unique_cpf_within_user

  geocoded_by :full_address
  after_validation :geocode

  def full_address
    "Rua #{street}, #{number} - #{city}, #{state}"
  end

  def unique_cpf_within_user
    existing_contact = Contact.where(user_id: user_id, cpf: cpf).where.not(id: id).first
    errors.add(:cpf, 'já está em uso para este usuário') if existing_contact.present?
  end
end
