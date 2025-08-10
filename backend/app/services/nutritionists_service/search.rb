module NutritionistsService
  class Search
    include NutritionistsService::Errors

    def initialize(nutritionistOrServiceName:, location: nil, page: nil, per_page: nil, include_services: false, services_limit: 10)
      @query = nutritionistOrServiceName
      @location = location
      @page = (page || 1).to_i
      @per_page = (per_page || 10).to_i
      @include_services = include_services
      @services_limit = services_limit.to_i
    end

    def call
      base_relation = Nutritionist.joins(:services)

      if @query.present?
        base_relation = base_relation.where("nutritionists.name ILIKE :q OR services.name ILIKE :q", q: "%#{@query}%")
      end

      base_relation = base_relation.distinct

      paginator = Pagination.new(base_relation, page: @page, per_page: @per_page)
      nutritionists = paginator.result[:data].select(:id, :name, :email)

      if @include_services
        nutritionists = nutritionists.map do |nutritionist|
          if @query.present?
            if nutritionist.name.downcase.include?(@query.downcase)
              services_scope = nutritionist.services
              services_scope = services_scope.where("services.location ILIKE ?", "%#{@location}%") if @location.present?
            else
              services_scope = nutritionist.services.where("services.name ILIKE ?", "%#{@query}%")
              services_scope = services_scope.where("services.location ILIKE ?", "%#{@location}%") if @location.present?
            end
          else
            services_scope = nutritionist.services
            services_scope = services_scope.where("services.location ILIKE ?", "%#{@location}%") if @location.present?
          end
        
          services = services_scope.limit(@services_limit)
        
          nutritionist.as_json.merge(
            services: services.map { |s| s.slice(:id, :name, :price_euros, :location) }
          )
        end
      
        nutritionists = nutritionists.select { |n| n[:services].any? }
      end

      Result.ok(paginator.result.merge(data: nutritionists))
    rescue => e
      Rails.logger.error("NutritionistsService::Search failed: #{e.message}")
      Result.errors([SOMETHING_WENT_WRONG])
    end

    def self.call(nutritionistOrServiceName:, location: nil, page: nil, per_page: nil, include_services: false, services_limit: 10)
      new(
        nutritionistOrServiceName: nutritionistOrServiceName,
        location: location,
        page: page,
        per_page: per_page,
        include_services: include_services,
        services_limit: services_limit
      ).call
    end
  end
end
