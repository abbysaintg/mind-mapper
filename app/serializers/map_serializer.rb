class MapSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :nodes, serializer: NodeSerializer
  has_many :edges, serializer: EdgeSerializer
end
