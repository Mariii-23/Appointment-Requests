class AuthenticationController < ApplicationController
  include ResponseHandler

  def login
    @nutritionist = Nutritionist.find_by(email: params[:email])

    if @nutritionist&.authenticate(params[:password])
      token = JWT.encode({ nutritionist_id: @nutritionist.id }, Rails.application.credentials.jwt_secret, 'HS256')
      result = Result.ok({
        token: token,
        nutritionist: @nutritionist.as_json(except: [:password_digest])
      })
      render_result(result)
    else
      result = Result.errors(['Email or password invalid'])
      render_result(result, success_status: :unauthorized)
    end
  end

  def logout
    head :no_content
  end
end
