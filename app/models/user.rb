class User < ApplicationRecord
    has_many :collaborations
    has_many :maps, through: :collaborations
end
