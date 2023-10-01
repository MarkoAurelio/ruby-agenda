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
require 'test_helper'

class ContactTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
