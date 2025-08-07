module ServicesService
  module Errors
    SERVICE_NOT_FOUND = ServiceError.new("Service not found.", :not_found)
    FAILED_TO_SAVE = ServiceError.new("Failed to save service.", :unprocessable_entity)
    FAILED_TO_FETCH = ServiceError.new("Failed to fetch services.", :internal_server_error)
    SOMETHING_WENT_WRONG = ServiceError.new("Something went wrong.", :internal_server_error)
  end
end
