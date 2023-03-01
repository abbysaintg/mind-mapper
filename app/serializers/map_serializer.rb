class MapSerializer < ActiveModel::Serializer
    attributes :id, :title
    has_many :nodes
    has_many :lines
    belongs_to :user
end
