module AppointmentsService
  class Update
    def initialize(nutritionist, appointment_id, params)
      @nutritionist = nutritionist
      @appointment_id = appointment_id
      @params = params
    end

    def call
      appointment = Appointment.joins(:service)
                                .where(services: { nutritionist_id: @nutritionist.id })
                                .find_by(id: @appointment_id)

      unless appointment
        Rails.logger.warn("UpdateService: Appointment #{@appointment_id} not found for nutritionist #{@nutritionist.id}")
        return Result.errors([AppointmentsService::Errors::APPOINTMENT_NOT_FOUND])
      end

      if appointment.update(@params)
        Result.ok(appointment)
      else
        Rails.logger.warn("UpdateService: Failed to update: #{appointment.errors.full_messages.join(', ')}")
        Result.errors([AppointmentsService::Errors::FAILED_TO_UPDATE])
      end
    rescue => e
      Rails.logger.error("AppointmentsService::Update failed: #{e.message}")
      Result.errors([AppointmentsService::Errors::SOMETHING_WENT_WRONG])
    end

    def self.call(nutritionist, appointment_id, params)
      new(nutritionist, appointment_id, params).call
    end
  end
end
