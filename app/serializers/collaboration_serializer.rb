class CollaborationSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :map
end
