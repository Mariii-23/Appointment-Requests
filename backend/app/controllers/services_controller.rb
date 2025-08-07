class ServicesController < ApplicationController
  include Authenticable
  include ResponseHandler

  before_action :authenticate_user!, only: [:create]

  def index
    page = params[:page]
    per_page = params[:per_page]
    search = params[:search]

    result = ServicesService::List.call(search, page: page, per_page: per_page)
    render_result(result)
  end

  def show
    result = ServicesService::Show.call(params[:id])
    render_result(result)
  end

  def create
    result = ServicesService::Create.call(current_user, service_params)
    render_result(result, success_status: :created)
  end

  private

  def service_params
    params.require(:service).permit(:name, :price_euros, :location)
  end
end
