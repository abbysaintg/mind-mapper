class LineSerializer < ActiveModel::Serializer
    attributes :id
    belongs_to :map
    belongs_to :node_1
    belongs_to :node_2
end
