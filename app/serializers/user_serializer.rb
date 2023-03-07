class UserSerializer < ActiveModel::Serializer
    attributes :id, :name, :avatar_seed, :email
    has_many :maps
end
