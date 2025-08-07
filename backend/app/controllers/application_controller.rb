class ApplicationController < ActionController::API
  rescue_from StandardError, with: :handle_internal_error
  rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found
  rescue_from ActionController::ParameterMissing, with: :handle_bad_request

  private

  def render_success(result: nil, status: :ok)
    render json: {
      isSuccess: true,
      result: result
    }.compact, status: status
  end

  def render_error(errors, status: :unprocessable_entity)
    render json: {
      isSuccess: false,
      errors: Array(errors)
    }, status: status
  end

  def handle_internal_error(exception)
    Rails.logger.error("[500] Internal Server Error: #{exception.class} - #{exception.message}")
    Rails.logger.error("[500] Location: #{exception.backtrace.first}")
    Rails.logger.error(exception.backtrace.join("\n")) if Rails.env.development?

    render_error("Something went wrong", status: :internal_server_error)
  end

  def handle_not_found(exception)
    Rails.logger.warn("[404] Not Found: #{exception.message}")
    Rails.logger.warn("[404] Location: #{exception.backtrace.first}")

    render_error("Resource not found", status: :not_found)
  end

  def handle_bad_request(exception)
    Rails.logger.warn("[400] Bad Request: #{exception.message}")
    Rails.logger.warn("[400] Location: #{exception.backtrace.first}")

    render_error("Bad request: #{exception.message}", status: :bad_request)
  end
end

