class Task < ApplicationRecord
  has_and_belongs_to_many :tags
  belongs_to :user

  validates :title, presence: true, uniqueness: true, length: {maximum: 50}
  validates :description, length: {maximum: 500}
end
