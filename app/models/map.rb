class Map < ApplicationRecord
    has_many :edges
    has_many :nodes
    has_many :collaborations
    has_many :users, through: :collaborations 
end
