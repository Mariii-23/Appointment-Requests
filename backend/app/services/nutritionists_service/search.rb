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

    def filtered_services_for(nutritionist)
      services_scope = nutritionist.services
      services_scope = services_scope.where("location ILIKE ?", "%#{@location}%") if @location.present?
        
      if @query.present? && !nutritionist.name.downcase.include?(@query_downcase)
        services_scope = services_scope.where("name ILIKE ?", "%#{@query}%")
      end
    
      services_scope.limit(@services_limit)
    end
    
    def call
      @query_downcase = @query.to_s.downcase
    
      base_relation = Nutritionist.joins(:services).distinct
    
      if @query.present?
        base_relation = base_relation.where("nutritionists.name ILIKE :q OR services.name ILIKE :q", q: "%#{@query}%")
      end
    
      if @location.present?
        base_relation = base_relation.where("services.location ILIKE ?", "%#{@location}%")
      end
    
      paginator = Pagination.new(base_relation.select(:id, :name, :email), page: @page, per_page: @per_page)
      nutritionists = paginator.result[:data]
    
      if @include_services
        nutritionists = nutritionists.map do |nutritionist|
          services = filtered_services_for(nutritionist).map { |s| s.slice(:id, :name, :price_euros, :location) }
          nutritionist.as_json.merge(services: services)
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
