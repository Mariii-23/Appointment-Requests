module ServicesService
  class List
    include ActiveModel::Model
    include ServicesService::Errors

    def initialize(query = nil, page: nil, per_page: nil)
      @query = query
      @page = page
      @per_page = per_page
    end

    def call
      base_relation = if @query.present?
        Service.joins(:nutritionist)
               .where("services.name ILIKE :q OR nutritionists.name ILIKE :q", q: "%#{@query}%")
               .distinct
      else
        Service.all
      end

      paginator = Pagination.new(base_relation, page: @page, per_page: @per_page)

      if paginator.result[:data].present?
        Result.ok(paginator.result)
      else
        Result.errors([FAILED_TO_FETCH])
      end
    rescue => e
      Rails.logger.error("ServicesService::List failed: #{e.message}")
      Result.errors([SOMETHING_WENT_WRONG])
    end

    def self.call(query = nil, page: nil, per_page: nil)
      new(query, page: page, per_page: per_page).call
    end
  end
end
