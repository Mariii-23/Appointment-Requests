class NutritionistsController < ApplicationController
    def index
        @nutritionists = Nutritionist.all
        render json: @nutritionists
    end

    def show
      @nutritionist = Nutritionist.find(params[:id])
      render json: @nutritionist
    end

    def search
        query = params[:nutritionistOrService]
        @nutritionists = Nutritionist.joins(:services)
                                     .where("nutritionists.name ILIKE ? OR services.name ILIKE ?", "%#{query}%", "%#{query}%")
                                     .distinct
        render json: @nutritionists
    end
end
