class NodeSerializer < ActiveModel::Serializer
    attributes :id, :label, :x, :y
    belongs_to :map
end
