module AppointmentsService
  class Show
    def initialize(nutritionist, appointment_id)
      @nutritionist = nutritionist
      @appointment_id = appointment_id
    end

    def call
      appointment = Appointment.joins(:service)
                               .where(services: { nutritionist_id: @nutritionist.id })
                               .find_by(id: @appointment_id)

      if appointment
        Result.ok(appointment)
      else
        Rails.logger.warn("AppointmentsService::Show: Appointment #{@appointment_id} not found for nutritionist #{@nutritionist.id}")
        Result.errors([AppointmentsService::Errors::APPOINTMENT_NOT_FOUND])
      end
    rescue => e
      Rails.logger.error("AppointmentsService::Show failed: #{e.message}")
      Result.errors([AppointmentsService::Errors::SOMETHING_WENT_WRONG])
    end

    def self.call(nutritionist, appointment_id)
      new(nutritionist, appointment_id).call
    end
  end
end
