module NutritionistsService
  class Search
    include NutritionistsService::Errors

    def initialize(search:, page: nil, per_page: nil, include_services: false, services_limit: 10)
      @search = search
      @page = (page || 1).to_i
      @per_page = (per_page || 10).to_i
      @include_services = include_services
      @services_limit = services_limit.to_i
    end

    def call
      base_relation = Nutritionist.joins(:services)
                                  .where("nutritionists.name ILIKE :q OR services.name ILIKE :q", q: "%#{@search}%")
                                  .distinct

      paginator = Pagination.new(base_relation, page: @page, per_page: @per_page)
      data = paginator.result[:data]

      if @include_services
        data = data.includes(:services).map do |nutritionist|
          nutritionist.as_json.merge(
            services: nutritionist.services
                    .limit(@services_limit)
                    .map { |s| s.slice(:id, :name, :price_euros, :location) }
          )
        end
      end

      Result.ok(paginator.result.merge(data: data))
    rescue => e
      Rails.logger.error("NutritionistsService::Search failed: #{e.message}")
      Result.errors([SOMETHING_WENT_WRONG])
    end

    def self.call(search:, page: nil, per_page: nil, include_services: false, services_limit: 10)
      new(
        search: search,
        page: page,
        per_page: per_page,
        include_services: include_services,
        services_limit: services_limit
      ).call
    end
  end
end
