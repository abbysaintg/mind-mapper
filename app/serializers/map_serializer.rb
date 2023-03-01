class MapSerializer < ActiveModel::Serializer
    attributes :id, :title
    has_many :nodes
    has_many :edges
    has_many :users
end
