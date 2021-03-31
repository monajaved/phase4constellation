class Constellation < ApplicationRecord
    has_many :favorites
    has_many :users, through: :favorites
    
    validates :name, presence: true
    validates :users, uniqueness: true

end
