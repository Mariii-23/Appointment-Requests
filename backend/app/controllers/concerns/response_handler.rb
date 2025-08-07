module ResponseHandler
  def render_result(result, success_status: :ok)
    if result.success?
      Rails.logger.info("Request succeeded with result: #{result.result.inspect}")

      render json: {
        isSuccess: true,
        result: result.result
      }, status: success_status
    else
      status = result.first_status || :unprocessable_entity
      error_messages = result.errors.map(&:message)

      Rails.logger.error("Request failed with status #{status}")
      Rails.logger.error("Errors: #{error_messages.join(', ')}")

      render json: {
        isSuccess: false,
        errors: error_messages
      }, status: status
    end
  rescue => e
    Rails.logger.fatal("Unexpected error in render_result: #{e.class} - #{e.message}")
    Rails.logger.fatal(e.backtrace.join("\n")) if Rails.env.development?

    render json: {
      isSuccess: false,
      errors: ["Unexpected error while rendering result"]
    }, status: :internal_server_error
  end
end
