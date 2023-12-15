# Library Book Collection Fullstack Web Application

This fullstack web application is designed for managing a library's book collection. It provides features for adding new books, updating their details, and allows real-time updates through GraphQL subscriptions using WebSockets. It's my exercise completion at [FullStackOpen's GraphQL Course](https://fullstackopen.com/en/part8).

## Technologies Used

### Frontend
- React
- react-router
- GraphQL (for client)

### Backend
- Express.js
- GraphQL (Apollo Server)
- MongoDB with Mongoose
- graphql-subscriptions with Websockets
- JSON Web Tokens (JWT) for authentication (BEWARE: since focus of this project is GraphQL, there's only one password hardcoded into application)
- dotenv for environment configuration
- CORS for cross-origin resource sharing

## Features
- Add and update book details
- Real-time updates using GraphQL subscriptions w/ WebSockets
