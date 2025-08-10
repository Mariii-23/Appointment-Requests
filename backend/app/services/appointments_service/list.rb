module AppointmentsService
  class List
    def initialize(nutritionist_id, page: nil, per_page: nil, status: nil)
      @nutritionist_id = nutritionist_id
      @page = page
      @per_page = per_page
      @status = status
    end

    def call
      base_relation = Appointment.joins(:service)
                                 .where(services: { nutritionist_id: @nutritionist_id })
                                 .order(created_at: :desc)
      
      base_relation = base_relation.where(status: @status) if @status.present?

      paginator = Pagination.new(base_relation, page: @page, per_page: @per_page)

      if paginator.result[:data].present?
        Result.ok(paginator.result)
      else
        Result.errors([AppointmentsService::Errors::FAILED_TO_FETCH])
      end
    rescue => e
      Rails.logger.error("AppointmentsService::List failed: #{e.message}")
      Result.errors([AppointmentsService::Errors::SOMETHING_WENT_WRONG])
    end

    def self.call(nutritionist_id, page: nil, per_page: nil, status: nil)
      new(nutritionist_id, page: page, per_page: per_page, status: status).call
    end
  end
end
