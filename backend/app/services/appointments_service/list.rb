module AppointmentsService
  class List
    def initialize(nutritionist_id, page: nil, per_page: nil)
      @nutritionist_id = nutritionist_id
      @page = page
      @per_page = per_page
    end

    def call
      # Build the base query
      base_relation = Appointment.joins(:service)
                                 .where(services: { nutritionist_id: @nutritionist_id })
    
      # Apply pagination
      paginator = Pagination.new(base_relation, page: @page, per_page: @per_page)
    
      # Check if there are results in the paginated data
      if paginator.result[:data].present?
        Result.ok(paginator.result)
      else
        Result.errors([AppointmentsService::Errors::FAILED_TO_FETCH])
      end
    rescue => e
      Rails.logger.error("AppointmentsService::List failed: #{e.message}")
      Result.errors([AppointmentsService::Errors::SOMETHING_WENT_WRONG])
    end


    # Entry point to call the service in a clean way (class method).
    def self.call(nutritionist_id, page: nil, per_page: nil)
      new(nutritionist_id, page: page, per_page: per_page).call
    end
  end
end
