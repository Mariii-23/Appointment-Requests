module MailService
  class AppointmentNotificationService
    def self.send_status_update_email(appointment)
      AppointmentMailer.status_update_email(appointment).deliver_later
    end
  end
end
