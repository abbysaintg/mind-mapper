class Node < ApplicationRecord
    belongs_to :map
    has_many :lines, dependent: :destroy
end
