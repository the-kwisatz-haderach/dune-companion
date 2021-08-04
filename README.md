# Build Docker image

$ docker build . -t kwisatz-haderach/dune-server

# Run via Docker

$ docker run -p 49160:8000 -d kwisatz-haderach/dune-server

# Get container ID

$ docker ps

# Print app output

$ docker logs <container id>

# Example

Running on http://localhost:8000

# Enter the container

$ docker exec -it <container id> /bin/bash

# Start using docker compose

docker-compose up --build
