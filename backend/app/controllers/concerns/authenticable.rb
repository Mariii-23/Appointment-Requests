module Authenticable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user!
  end

  def authenticate_user!
    token = request.headers['Authorization']&.split(' ')&.last
    Rails.logger.info "Auth token received: #{token.inspect}"

    if token.blank?
      render json: { error: 'Token missing' }, status: :unauthorized
      return
    end

    begin
      payload = JWT.decode(token, Rails.application.credentials.jwt_secret, true, algorithm: 'HS256')[0]
      Rails.logger.info "Payload: #{payload}"
      @current_user = Nutritionist.find(payload['nutritionist_id'])
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      render json: { error: 'Invalid token' }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end
end
