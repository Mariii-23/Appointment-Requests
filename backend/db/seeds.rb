require 'faker'

NUMBER_OF_NUTRITIONISTS = 10
MIN_PRICE_CENTS = 25
MAX_PRICE_CENTS = 150
DEFAULT_PASSWORD = '123456789'
APPOINTMENTS_PER_SERVICE = 2
APPOINTMENT_STATUSES = ['pending', 'confirmed', 'canceled']

ActiveRecord::Base.transaction do
    puts "Creating fixed admin nutritionist..."

     admin = Nutritionist.find_or_create_by!(email: 'admin@admin.com') do |nutritionist|
      nutritionist.name = 'Admin Admin'
      nutritionist.password = DEFAULT_PASSWORD
      nutritionist.password_confirmation = DEFAULT_PASSWORD
    end

    puts "Creating 4 fixed services for admin nutritionist..."

    (4 - admin.services.count).times do
        admin.services.create!(
          name: Faker::Commerce.product_name,
          price_euros: rand(MIN_PRICE_CENTS..MAX_PRICE_CENTS),
          location: Faker::Address.city
        )
    end

    puts "Creating random nutritionists and services..."

    NUMBER_OF_NUTRITIONISTS.times do
      nutritionist = Nutritionist.create!(
        name: Faker::Name.name,
        email: Faker::Internet.unique.email,
        password: DEFAULT_PASSWORD,
        password_confirmation: DEFAULT_PASSWORD
      )

      rand(1..3).times do
        nutritionist.services.create!(
          name: Faker::Commerce.product_name,
          price_euros: rand(MIN_PRICE_CENTS..MAX_PRICE_CENTS),
          location: Faker::Address.city
        )
      end
    end

    puts "Creating fixed number of appointments per service..."

    Service.find_each do |service|
      APPOINTMENTS_PER_SERVICE.times do
        Appointment.create!(
          guest_name: Faker::Name.name,
          guest_email: Faker::Internet.email,
          date_time: Faker::Time.forward(days: 30, period: :day),
          status: 'pending',
          service: service
        )
      end
    end

    puts "Seed process completed!"
end 