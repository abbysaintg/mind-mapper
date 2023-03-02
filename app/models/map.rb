class Map < ApplicationRecord
    belongs_to :user
    has_many :nodes, dependent: :destroy
    has_many :lines, dependent: :destroy
end
