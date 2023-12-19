docker run \
  --name postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD="senha0001" \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

# docker logs postgres
# docker exec -it postgres psql --username postgres --dbname heroes

# CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR(100) NOT NULL);
# SELECT * FROM warriors;

# mongodb
docker run \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=mongodb \
  -e MONGO_INITDB_ROOT_PASSWORD="senha0001" \
  -p 27017:27017 \
  -d \
  mongo:4

# docker logs mongodb