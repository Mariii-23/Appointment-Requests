class ServiceError
  attr_reader :message, :status

  def initialize(message, status = :unprocessable_entity)
    @message = message
    @status = status
  end

  def to_s
    message
  end
end
