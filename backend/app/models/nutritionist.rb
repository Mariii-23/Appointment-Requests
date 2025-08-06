class Nutritionist < ApplicationRecord
    has_secure_password

    has_many :services, dependent: :destroy
    has_many :appointments, through: :services

    validates :email, presence: true, uniqueness: true
    validates :name, presence: true
end
