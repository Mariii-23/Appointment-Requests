module NutritionistsService
  class Search
    include NutritionistsService::Errors

    def initialize(query, page: nil, per_page: nil)
      @query = query
      @page = page
      @per_page = per_page
    end

    def call
      base_relation = Nutritionist.joins(:services)
                                  .where("nutritionists.name ILIKE :q OR services.name ILIKE :q", q: "%#{@query}%")
                                  .distinct

      paginator = Pagination.new(base_relation, page: @page, per_page: @per_page)

      if paginator.result[:data].present?
        Result.ok(paginator.result)
      else
        Result.errors([FAILED_TO_FETCH])
      end
    rescue => e
      Rails.logger.error("NutritionistsService::Search failed: #{e.message}")
      Result.errors([SOMETHING_WENT_WRONG])
    end

    def self.call(query, page: nil, per_page: nil)
      new(query, page: page, per_page: per_page).call
    end
  end
end
