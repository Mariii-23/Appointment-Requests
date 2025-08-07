module NutritionistsService
    module Errors
      NUTRITIONIST_NOT_FOUND = ServiceError.new("Nutricionist not found.", :not_found)
      FAILED_TO_SAVE = ServiceError.new("Failed to save nutricionist.", :unprocessable_entity)
      FAILED_TO_FETCH = ServiceError.new("Failed to fetch nutricionists.", :internal_server_error)
      SOMETHING_WENT_WRONG = ServiceError.new("Something went wrong.", :internal_server_error)
    end
end
