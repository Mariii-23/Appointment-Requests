.PHONY: db-up

db-up:
	docker-compose up -d postgresql

db-down:
	docker-compose down 

db-logs:
	docker-compose logs -f postgresql

db-create:
	rails db:create

db-seed:
	rails db:seed