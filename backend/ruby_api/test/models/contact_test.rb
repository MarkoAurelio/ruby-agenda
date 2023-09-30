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
require 'test_helper'

class ContactTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
