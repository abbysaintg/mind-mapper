class CollaborationSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :map_id
    belongs_to :user
    belongs_to :map
end
