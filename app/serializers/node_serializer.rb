class NodeSerializer < ActiveModel::Serializer
  attributes :id, :label, :x, :y, :color, :parent_id
  has_one :map
end
