class User < ApplicationRecord
    has_secure_password
    has_many :collaborations
    has_many :maps, through: :collaborations
end
