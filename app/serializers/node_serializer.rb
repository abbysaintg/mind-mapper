class NodeSerializer < ActiveModel::Serializer
    attributes :id, :label, :color, :x, :y
    belongs_to :map
end
