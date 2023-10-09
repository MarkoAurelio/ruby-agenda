require 'faker'

Faker::Config.locale = 'pt-BR'

User.destroy_all

User.create!(name: 'Marko', email: 'marko@dev.com', password: 'abc@123')
User.create!(name: 'User Dev 2', email: 'user2@dev.com', password: 'abc@123')
User.create!(name: 'User Dev 3', email: 'user3@dev.com', password: 'abc@123')

User.all.each do |user|
  10.times do
    contact = Contact.create(
      user: user,
      name: Faker::Name.name,
      cpf: Faker::IDNumber.brazilian_citizen_number(formatted: true),
      phone: Faker::PhoneNumber.phone_number,
      street: Faker::Address.street_name,
      neighborhood: Faker::Address.community,
      number: Faker::Address.building_number,
      city: Faker::Address.city,
      state: Faker::Address.state_abbr,
      complement: Faker::Address.secondary_address,
      cep: Faker::Address.zip_code
    )

    contact.latitude = Faker::Address.latitude
    contact.longitude = Faker::Address.longitude

    contact.save
  end
end
