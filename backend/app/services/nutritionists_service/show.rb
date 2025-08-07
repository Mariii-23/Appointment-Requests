module NutritionistsService
  class Show
    include NutritionistsService::Errors

    def self.call(id)
      nutritionist = Nutritionist.find_by(id: id)

      if nutritionist
        Result.ok(nutritionist)
      else
        Result.errors([NUTRITIONIST_NOT_FOUND], status: :not_found)
      end
    rescue => e
      Rails.logger.error("NutritionistsService::Show failed: #{e.message}")
      Result.errors([SOMETHING_WENT_WRONG])
    end
  end
end
