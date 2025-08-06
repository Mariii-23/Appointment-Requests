class Appointment < ApplicationRecord
  belongs_to :service

  enum status: { pending: "pending", accepted: "accepted", rejected: "rejected" }

  validates :guest_name, :guest_email, :date_time, presence: true

  # Custom validation to ensure a guest cannot have more than one pending appointment request at the same time.
  # This validation is placed in the model to enforce the business rule consistently across the entire application,
  # regardless of where or how an Appointment is created or updated (e.g., through controllers, background jobs, or console).
  # Keeping this logic in the model guarantees data integrity and prevents duplicates at the data level.
  validate :only_one_pending_per_guest, on: :create

  def only_one_pending_per_guest
    if Appointment.pending.where(guest_email: guest_email).exists?
      errors.add(:base, "You already have a pending request.")
    end
  end
end
