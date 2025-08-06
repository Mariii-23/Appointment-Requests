class ServicesController < ApplicationController
    include Authenticable 


    before_action :authenticate_user!, only: [:create]

    def index
      @services = Service.all
      render json: @services
    end

    def show
      @service = Service.find(params[:id])
      render json: @service
    end

    def create
      @service = current_user.services.build(service_params)

      if @service.save
        render json: @service, status: :created
      else
        render json: { errors: @service.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def service_params
      params.require(:service).permit(:name, :price_euros, :location)
    end
end
