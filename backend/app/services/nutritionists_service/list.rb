module NutritionistsService
  class List
    include NutritionistsService::Errors

    def initialize(page: nil, per_page: nil)
      @page = page
      @per_page = per_page
    end

    def call
      base_relation = Nutritionist.all

      paginator = Pagination.new(base_relation, page: @page, per_page: @per_page)

      if paginator.result[:data].present?
        Result.ok(paginator.result)
      else
        Result.errors([FAILED_TO_FETCH])
      end
    rescue => e
      Rails.logger.error("NutritionistsService::List failed: #{e.message}")
      Result.errors([FAILED_TO_FETCH])
    end

    def self.call(page: nil, per_page: nil)
      new(page: page, per_page: per_page).call
    end
  end
end
