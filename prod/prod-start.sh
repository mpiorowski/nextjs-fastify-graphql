#!/bin/sh

# 1. Stop all containers
docker stop $(docker ps -a -q)

# 2. Create folder for database
cd ../db
mkdir prod
sudo chmod 777 -R prod

# 3. Run docker compose
docker-compose -f ../prod/docker-compose.prod.yml up -d --build

# 4. Run migrations
npm install
npm run migrate
