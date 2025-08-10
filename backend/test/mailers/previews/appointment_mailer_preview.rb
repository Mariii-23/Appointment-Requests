# Preview all emails at http://localhost:3000/rails/mailers/appointment_mailer
class AppointmentMailerPreview < ActionMailer::Preview
    def status_update_email
        appointment = Appointment.first || Appointment.new(
          guest_email: "example@example.com",
          status: "accepted"
        )
        AppointmentMailer.status_update_email(appointment)
    end
end
