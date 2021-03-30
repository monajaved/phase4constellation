class User < ApplicationRecord
    has_many :favorites
    has_many :constellations, through: :favorites

    validates :username, uniqueness: true

end
