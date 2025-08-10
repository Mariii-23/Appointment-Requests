module AppointmentsService
    module Errors
      SERVICE_NOT_FOUND = ServiceError.new("Service not found.", :not_found)
      NUTRIONIST_NOT_FOUND = ServiceError.new("Nutritionist not found.", :not_found)
      APPOINTMENT_NOT_FOUND = ServiceError.new("Appointment not found.", :not_found)
      INVALID_STATUS = ServiceError.new("Invalid status.", :unprocessable_entity)
      FAILED_TO_SAVE = ServiceError.new("Failed to save appointment. You already have a pending request or the pending request cannot be in the past.", :bad_request)
      FAILED_TO_FETCH = ServiceError.new("Failed to fetch appointments.", :bad_request)
      SOMETHING_WENT_WRONG = ServiceError.new("Something went wrong.", :internal_server_error)
    end
end
