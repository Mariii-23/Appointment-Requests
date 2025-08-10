class Appointment < ApplicationRecord
  belongs_to :service

  STATUSES = ["pending", "accepted", "rejected"]

  validates :status, presence: true, inclusion: { in: STATUSES }
  validates :guest_name, :guest_email, :date_time, presence: true

  validate :only_one_pending_per_guest, on: :create
  validate :date_cannot_be_in_the_past, on: :create

  # Custom validation to ensure a guest cannot have more than one pending appointment request at the same time.
  # This validation is placed in the model to enforce the business rule consistently across the entire application,
  # regardless of where or how an Appointment is created or updated (e.g., through controllers, background jobs, or console).
  # Keeping this logic in the model guarantees data integrity and prevents duplicates at the data level.
  def only_one_pending_per_guest
    if Appointment.where(status: "pending", guest_email: guest_email).exists?
      errors.add(:base, "You already have a pending request.")
    end
  end

  def date_cannot_be_in_the_past
    if date_time.present? && date_time < Time.current
      errors.add(:date_time, "The pending request cannot be in the past.")
    end
  end
end
