class Result
  attr_reader :result, :errors

  def initialize(result: nil, errors: [])
    @result = result
    @errors = Array(errors)
    log_errors if has_errors?
  end

  def self.ok(result = nil)
    new(result: result, errors: [])
  end

  def self.errors(errors)
    error_array = Array(errors)
    new(result: nil, errors: error_array)
  end

  def success?
    errors.empty?
  end

  def has_errors?
    !success?
  end

  def first_status
    return :ok if success?
    errors.first.respond_to?(:status) ? errors.first.status : :internal_server_error
  end

  def add_errors(new_errors)
    additional_errors = case new_errors
                        when Result
                          new_errors.errors
                        when Array
                          new_errors
                        else
                          [new_errors]
                        end

    @errors += additional_errors
    log_errors
    self
  end

  def to_s
    <<~LOG.chomp
      Result(success?: #{success?})
      Errors:
      #{errors.map { |e| "- #{format_error(e)}" }.join("\n")}
    LOG
  end

  private

  def format_error(error)
    if error.is_a?(ServiceError)
      "Status (#{error.status}) :: Message: #{error.message}"
    else
      error.to_s
    end
  end

  def log_errors
    errors.each do |error|
      Rails.logger.error("[Result Error] #{format_error(error)}")
    end
  end
end
