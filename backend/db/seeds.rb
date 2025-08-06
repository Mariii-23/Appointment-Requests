require 'faker'

NUMBER_OF_NUTRITIONISTS = 10
MIN_PRICE_CENTS = 25
MAX_PRICE_CENTS = 150
DEFAULT_PASSWORD = '123456789'
NUMBER_OF_APPOINTMENTS = 20
APPOINTMENT_STATUSES = ['pending', 'confirmed', 'canceled']

ActiveRecord::Base.transaction do
    puts "Creating fixed admin nutritionist..."

    Nutritionist.find_or_create_by!(email: 'admin@example.com') do |nutritionist|
      nutritionist.name = 'Admin Admin'
      nutritionist.password = DEFAULT_PASSWORD
      nutritionist.password_confirmation = DEFAULT_PASSWORD
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

    puts "Creating some random appointments..."

    services = Service.all

    NUMBER_OF_APPOINTMENTS.times do
      service = services.sample
      Appointment.create!(
        guest_name: Faker::Name.name,
        guest_email: Faker::Internet.email,
        date_time: Faker::Time.forward(days: 30, period: :day),
        status: 'pending', #APPOINTMENT_STATUSES.sample,
        service: service
      )
    end

    puts "Seed process completed!"
end 