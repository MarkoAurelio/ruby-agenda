FactoryBot.define do
  factory :user do
    name { 'User Random' }
    email { 'random@dev.com' }
    password { 'abc@123' }
  end
end
