module AppointmentsService
  class UpdateStatus
    VALID_STATUSES = Appointment::STATUSES

    def initialize(appointment, new_status)
      @appointment = appointment
      @new_status = new_status
    end

    def call
      unless VALID_STATUSES.include?(@new_status)
        Rails.logger.warn("UpdateStatusService: Invalid status #{@new_status}")
        return Result.errors([AppointmentsService::Errors::INVALID_STATUS])
      end

      ActiveRecord::Base.transaction do
        @appointment.status = @new_status

        reject_conflicting_appointments if @new_status == "accepted"

        @appointment.save!
      end

      # TODO: trigger email notification
      # TODO: call email service

      Result.ok(@appointment)
    rescue ActiveRecord::RecordInvalid => e
      Rails.logger.warn("UpdateStatusService: Save failed: #{@appointment.errors.full_messages.join(', ')}")
      Result.errors([AppointmentsService::Errors::FAILED_TO_SAVE])
    rescue => e
      Rails.logger.error("AppointmentsService::UpdateStatus failed: #{e.message}")
      Result.errors([AppointmentsService::Errors::SOMETHING_WENT_WRONG])
    end

    def self.call(appointment, new_status)
      new(appointment, new_status).call
    end

    private

    def reject_conflicting_appointments
      nutritionist_id = @appointment.service.nutritionist_id
      time = @appointment.date_time

      Appointment.where(status: "pending")
                 .joins(service: :nutritionist)
                 .where(services: { nutritionist_id: nutritionist_id })
                 .where(date_time: time)
                 .where.not(id: @appointment.id)
                 .update_all(status: "rejected")
    end
  end
end
