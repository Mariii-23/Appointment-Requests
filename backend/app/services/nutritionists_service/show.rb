module NutritionistsService
  class Show
  include NutritionistsService::Errors

  def self.find_by_id(id)
    nutritionist = Nutritionist.find_by(id: id)

    return Result.errors([NUTRITIONIST_NOT_FOUND], status: :not_found) unless nutritionist

    Result.ok(nutritionist)
  end

    def self.call(id, include_services: false)
      query = Nutritionist.where(id: id).select(:id, :name, :email)
      query = query.includes(:services) if include_services

      nutritionist = query.first

      return Result.errors([NUTRITIONIST_NOT_FOUND], status: :not_found) unless nutritionist

      result = {
        id: nutritionist.id,
        name: nutritionist.name,
        email: nutritionist.email,
      }

      if include_services
        result[:services] = nutritionist.services.select(:id, :name, :price_euros, :location).map do |service|
          {
            id: service.id,
            name: service.name,
            location: service.location,
            price_euros: service.price_euros
          }
        end
      end

      Result.ok(result)
    rescue => e
      Rails.logger.error("NutritionistsService::Show failed: #{e.message}")
      Result.errors([SOMETHING_WENT_WRONG])
    end
  end
end
