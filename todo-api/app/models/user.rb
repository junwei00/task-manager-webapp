class User < ApplicationRecord
  has_many :tasks, dependent: :destroy
  has_many :tags, dependent: :destroy

  validates :username, uniqueness: true, presence: true, length: {maximum: 30, minimum: 5}
end
