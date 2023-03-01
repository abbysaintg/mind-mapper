class Map < ApplicationRecord
    belongs_to :user
    has_many :nodes
    has_many :lines
end
