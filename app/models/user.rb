class User < ApplicationRecord
    has_many :maps, dependent: :destroy
    has_secure_password
end
