module ServicesService
  class Show
    include ServicesService::Errors

    def initialize(id)
      @id = id
    end

    def call
      service = Service.find_by(id: @id)
      if service
        Result.ok(service)
      else
        Result.errors([SERVICE_NOT_FOUND])
      end
    rescue => e
      Rails.logger.error("ServicesService::Show failed: #{e.message}")
      Result.errors([FAILED_TO_FETCH])
    end

    def self.call(id)
      new(id).call
    end
  end
end
