class ContactSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :cpf,
             :phone,
             :street,
             :neighborhood,
             :number,
             :city,
             :state,
             :complement,
             :cep,
             :latitude,
             :longitude
end
