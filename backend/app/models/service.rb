class Service < ApplicationRecord
  belongs_to :nutritionist

  has_many :appointments, dependent: :destroy

  validates :name, :price_euros, :location, presence: true
end
