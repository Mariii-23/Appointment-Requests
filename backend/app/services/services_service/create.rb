module ServicesService
  class Create
    include ServicesService::Errors

    def initialize(nutritionist, params)
      @nutritionist = nutritionist
      @params = params
    end

    def call
      service = @nutritionist.services.build(@params)
      if service.save
        Result.ok(service)
      else
        Rails.logger.warn("ServicesService::Create save failed: #{service.errors.full_messages.join(', ')}")
        Result.errors([FAILED_TO_SAVE])
      end
    rescue => e
      Rails.logger.error("ServicesService::Create failed: #{e.message}")
      Result.errors([FAILED_TO_SAVE])
    end

    def self.call(nutritionist, params)
      new(nutritionist, params).call
    end
  end
end
