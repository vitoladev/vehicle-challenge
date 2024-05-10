.PHONY: server client

all: server client

server:
	cd ./server && npm ci
	cd ./server && docker compose up -d
	cp ./server/.env.example ./server/.env
	npm run db:push --prefix ./server
	npm run dev --prefix ./server
client:
	cd ./client && npm ci
	npm start --prefix ./client

down:
	cd ./server && docker compose down