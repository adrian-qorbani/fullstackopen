# Blog-App Express Server with PostgreSQL (Dockerized)

This project is an Express server application with PostgreSQL for the database, containerized with Docker for my certification project for FullStackOpen's part 13: Relational Database.

## Installation

1. Make sure you have Node.js and npm installed on your machine.
2. Clone this repository: `git clone <repository-url>`
3. Navigate to the project directory: `cd <project-directory>`
4. Install dependencies: `npm install`

## Usage

To run the application locally, you can use Docker:

1. Make sure Docker is installed on your machine.
2. Start Postgres Docker image: `docker run -e POSTGRES_PASSWORD=somepassword -p 5432:5432 postgres`
3. Open psql cli with docker exec command: `docker exec -it <container id> psql -U postgres postgres`
4. (optional) If you want persistent data, use **volumes**.
5. Run the server: `node index.js`

