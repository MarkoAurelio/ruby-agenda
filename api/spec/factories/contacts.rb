require 'faker'

FactoryBot.define do
  factory :contact do
    name { Faker::Name.name }
    cpf { Faker::IDNumber.brazilian_citizen_number(formatted: true) }
    phone { Faker::PhoneNumber.phone_number }
    street { Faker::Address.street_name }
    neighborhood { Faker::Address.community }
    number { Faker::Address.building_number }
    city { Faker::Address.city }
    state { Faker::Address.state_abbr }
    complement { Faker::Address.secondary_address }
    cep { Faker::Address.zip_code }
    user
  end
end
