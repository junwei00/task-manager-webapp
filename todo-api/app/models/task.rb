class Task < ApplicationRecord
  has_and_belongs_to_many :tags

  validates :title, presence: true
  validates :description, presence: true
  validates :deadline, presence: true
end
