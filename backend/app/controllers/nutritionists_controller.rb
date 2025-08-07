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

    result = NutritionistsService::Search.call(params[:nutritionistOrService], page: page, per_page: per_page)
    render_result(result)
  end
end
