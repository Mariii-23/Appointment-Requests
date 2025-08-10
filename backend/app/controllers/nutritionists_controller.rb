class NutritionistsController < ApplicationController
  include ResponseHandler

  def index
    page = params[:page]
    per_page = params[:per_page]

    result = NutritionistsService::List.call(page: page, per_page: per_page)
    render_result(result)
  end

  def show
    include_services = ActiveModel::Type::Boolean.new.cast(params[:include_services])

    result = NutritionistsService::Show.call(params[:id], include_services: include_services)
    render_result(result)
  end

  def search
    page = params[:page]
    per_page = params[:per_page]
    include_services = ActiveModel::Type::Boolean.new.cast(params[:include_services])
    services_limit = (params[:services_limit] || 10).to_i
    nutritionistOrServiceName = params[:nutritionist_or_service_name]
    location = params[:location]

    result = NutritionistsService::Search.call(
      nutritionistOrServiceName: nutritionistOrServiceName,
      location: location,
      page: page,
      per_page: per_page,
      include_services: include_services,
      services_limit: services_limit
    )
    render_result(result)
  end
end
