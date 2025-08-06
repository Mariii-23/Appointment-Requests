class AppointmentsController < ApplicationController
  include Authenticable

  before_action :set_appointment, only: [:update, :update_status]
  before_action :authenticate_user!, only: [:update, :update_status, :index, :show]

  def index
    @appointments = Appointment.joins(:service)
                               .where(services: { nutritionist_id: current_user.id })
    render json: @appointments
  end
  
  def show
    @appointment = Appointment.joins(:service)
                               .where(services: { nutritionist_id: current_user.id })
                               .find_by(id: params[:id])
  
    if @appointment
      render json: @appointment
    else
      render json: { error: "Appointment not found" }, status: :not_found
    end
  end

  def create
    #TODO: Verificar se existe o servico
    @appointment = Appointment.new(appointment_params)
    @appointment.status = "pending"
    if @appointment.save
      render json: @appointment, status: :created
    else
      render json: { errors: @appointment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @appointment.update(appointment_update_params)
      render json: @appointment
    else
      render json: { errors: @appointment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update_status
    new_status = params[:status]

    unless Appointment::STATUSES.include?(new_status)
      return render json: { error: "Invalid status" }, status: :unprocessable_entity
    end

    ActiveRecord::Base.transaction do
      @appointment.status = new_status

      if new_status == "accepted"
        reject_conflicting_appointments(@appointment)
      end

      @appointment.save!
    end

    # TODO: Trigger email notification here 

    render json: @appointment
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  private

  def set_appointment
    @appointment = Appointment.find(params[:id])
  end

  def appointment_update_params
    params.require(:appointment).permit(:guest_name, :guest_email, :date_time)
  end

  def appointment_create_params
    params.require(:appointment).permit(:guest_name, :guest_email, :date_time, :service_id)
  end

  def reject_conflicting_appointments(appointment)
    nutritionist_id = appointment.service.nutritionist_id
    time = appointment.date_time

    Appointment.where(status: "pending")
               .joins(service: :nutritionist)
               .where(services: { nutritionist_id: nutritionist_id })
               .where(date_time: time)
               .where.not(id: appointment.id)
               .update_all(status: "rejected")
  end
end
