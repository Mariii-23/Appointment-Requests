.PHONY: backend-up backend-seed frontend-up

# Installs dependencies, sets up the DB, and starts the backend server
backend-up:
	cd backend && bundle install
	cd backend && make db-up
	cd backend && rails s

# Installs dependencies, sets up the DB, and seeds it with initial data
backend-seed:
	cd backend && bundle install
	cd backend && make db-up
	cd backend && make db-seed

# Installs dependencies and starts the frontend server
frontend-up:
	cd frontend && npm install
	cd frontend && npm run dev
