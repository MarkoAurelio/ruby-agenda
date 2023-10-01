# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  name            :string
#  email           :string
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_many :contacts, dependent: :destroy
  has_secure_password
  validates :password, presence: true, length: { minimum: 6 }
  validates :email, presence: true, uniqueness: true
end
