class Tag < ApplicationRecord
    has_and_belongs_to_many :tasks
    belongs_to :user

    validates :name, presence: true, length: {maximum: 10}
end
