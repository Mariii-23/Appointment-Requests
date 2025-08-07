class NutritionistsController < ApplicationController
  include ResponseHandler

  def index
    page = params[:page]
    per_page = params[:per_page]

    result = NutritionistsService::List.call(page: page, per_page: per_page)
    render_result(result)
  end

  def show
    result = NutritionistsService::Show.call(params[:id])
    render_result(result)
  end

  def search
    page = params[:page]
    per_page = params[:per_page]
    include_services = ActiveModel::Type::Boolean.new.cast(params[:include_services])
    services_limit = (params[:services_limit] || 10).to_i
    search = params[:search]

    result = NutritionistsService::Search.call(
      search: search,
      page: page,
      per_page: per_page,
      include_services: include_services,
      services_limit: services_limit
    )
    render_result(result)
  end
end
