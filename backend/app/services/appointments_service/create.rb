module AppointmentsService
  class Create
    def initialize(nutritionist, appointment_params)
      @nutritionist = nutritionist
      @params = appointment_params
    end

    def call
      service = Service.find_by(id: @params[:service_id], nutritionist_id: @nutritionist.id)

      unless service
        Rails.logger.warn("CreateService: Service #{@params[:service_id]} not found for nutritionist #{@nutritionist.id}")
        return Result.errors([AppointmentsService::Errors::SERVICE_NOT_FOUND])
      end

      appointment = Appointment.new(@params.except(:service_id))
      appointment.service = service
      appointment.status = "pending"

      if appointment.save
        Result.ok(appointment)
      else
        Rails.logger.warn("CreateService: Appointment save failed: #{appointment.errors.full_messages.join(', ')}")
        Result.errors([AppointmentsService::Errors::FAILED_TO_CREATE])
      end
    rescue => e
      Rails.logger.error("AppointmentsService::Create failed: #{e.message}")
      Result.errors([AppointmentsService::Errors::SOMETHING_WENT_WRONG])
    end

    def self.call(nutritionist, appointment_params)
      new(nutritionist, appointment_params).call
    end
  end
end
