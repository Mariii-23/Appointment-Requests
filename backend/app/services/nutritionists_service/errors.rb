module NutritionistsService
    module Errors
      NUTRITIONIST_NOT_FOUND = ServiceError.new("Nutritionist not found.", :not_found)
      FAILED_TO_SAVE = ServiceError.new("Failed to save nutritionist.", :unprocessable_entity)
      FAILED_TO_FETCH = ServiceError.new("Failed to fetch nutritionists.", :internal_server_error)
      SOMETHING_WENT_WRONG = ServiceError.new("Something went wrong.", :internal_server_error)
    end
end
