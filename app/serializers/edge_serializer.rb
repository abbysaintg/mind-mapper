class EdgeSerializer < ActiveModel::Serializer
    attributes :id, :source_node_id, :target_node_id, :map_id, :source_x, :source_y, :target_x, :target_y
    belongs_to :source_node
    belongs_to :target_node

    def source_x
      object.source_node.x
    end

    def source_y
      object.source_node.y
    end

    def target_x
      object.target_node.x
    end

    def target_y
      object.target_node.y
    end
  end
