module AppointmentsService
    class Index
      def initialize(nutritionist)
        @nutritionist = nutritionist
      end

      def call
        #TODO: chamar o service dos services
        appointments = Appointment.joins(:service)
                                  .where(services: { nutritionist_id: @nutritionist.id })

        Result.ok(appointments)
      rescue => e
        Rails.logger.error("Appointments::IndexService failed: #{e.message}")
        Result.errors(Services::AppointmentsService::Errors::FAILED_TO_FETCH)
      end
    end
  end
