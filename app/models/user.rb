class User < ApplicationRecord
    has_many :maps
    has_secure_password
end
