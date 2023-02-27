class EdgeSerializer < ActiveModel::Serializer
  attributes :id, :source, :target
  has_one :map
end
