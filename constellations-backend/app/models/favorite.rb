class Favorite < ApplicationRecord
    belongs_to :constellation
    belongs_to :user

    # validates :constellation_id, uniqueness: true
end
