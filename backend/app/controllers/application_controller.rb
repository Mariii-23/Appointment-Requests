class ApplicationController < ActionController::API
    private

    def render_success(result: nil, status: :ok)
        response = { isSuccess: true }
        response[:result] = result if result.present?
        render json: response, status: status
    end

    def render_error(errors, status: :unprocessable_entity)
        render json: { isSuccess: false, errors: Array(errors) }, status: status
    end
end
