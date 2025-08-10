class AppointmentMailer < ApplicationMailer
  def status_update_email(appointment)
    @appointment = appointment
    mail(to: @appointment.guest_email, subject: "Your appointment status was updated")
  end
end
