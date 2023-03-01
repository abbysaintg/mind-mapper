class Line < ApplicationRecord
    belongs_to :map
    belongs_to :node_1, class_name: 'Node', foreign_key: 'node_id_1'
    belongs_to :node_2, class_name: 'Node', foreign_key: 'node_id_2'
end
