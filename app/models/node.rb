class Node < ApplicationRecord
    belongs_to :map
    belongs_to :parent, class_name: "Node", optional: true
    has_many :children, class_name: "Node", foreign_key: "parent_id"
    has_many :outgoing_edges, foreign_key: "source_node_id", class_name: "Edge"
    has_many :incoming_edges, foreign_key: "target_node_id", class_name: "Edge"
end
