class LineSerializer < ActiveModel::Serializer
    attributes :id, :parent_id, :child_id
    belongs_to :map
end
