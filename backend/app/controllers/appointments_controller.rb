class AppointmentsController < ApplicationController
  include Authenticable
  include ResponseHandler

  before_action :authenticate_user!, only: [:update, :update_status, :index, :show]
  before_action :set_appointment, only: [:update, :update_status]

  def index
    page = params[:page]
    per_page = params[:per_page]

    result = AppointmentsService::List.call(current_user.id, page: page, per_page: per_page)
    render_result(result)
  end

  def show
    result = AppointmentsService::Show.call(current_user, params[:id])
    render_result(result)
  end

  def create
    result = AppointmentsService::Create.call(appointment_create_params)
    render_result(result, success_status: :created)
  end

  def update
    result = AppointmentsService::Update.call(current_user,@appointment, appointment_update_params)
    render_result(result)
  end

  def update_status
    result = AppointmentsService::UpdateStatus.call(@appointment, params[:status])
    render_result(result)
  end

  private

  def set_appointment
    @appointment = Appointment.find_by(id: params[:id])
    render json: { error: "Appointment not found" }, status: :not_found unless @appointment
  end

  def appointment_create_params
    params.require(:appointment).permit(:guest_name, :guest_email, :date_time, :service_id)
  end

  def appointment_update_params
    params.require(:appointment).permit(:guest_name, :guest_email, :date_time)
  end
end
