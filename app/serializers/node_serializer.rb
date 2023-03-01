class NodeSerializer < ActiveModel::Serializer
    attributes :id, :label, :x, :y, :color
    belongs_to :map
    belongs_to :parent
    has_many :children
    has_many :outgoing_edges
    has_many :incoming_edges
end
