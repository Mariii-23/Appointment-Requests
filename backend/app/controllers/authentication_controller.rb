class AuthenticationController < ApplicationController
    def login
      @nutritionist = Nutritionist.find_by(email: params[:email])
      if @nutritionist&.authenticate(params[:password])
        token = JWT.encode({ nutritionist_id: @nutritionist.id }, Rails.application.credentials.jwt_secret, 'HS256')
        render json: { token: token, nutritionist: @nutritionist.as_json(except: [:password_digest]) }
      else
        render json: { error: 'Email or password invalid' }, status: :unauthorized
      end
    end

    def logout
        head :created
    end
end
