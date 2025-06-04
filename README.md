# Chapter Performance Dashboard Backend

A RESTful API backend for managing chapter performance data with features like filtering, caching, and rate limiting.

## Features

- RESTful API endpoints for managing chapters
- MongoDB for data persistence
- Redis for caching and rate limiting
- TypeScript for type safety
- Express.js framework
- JWT authentication
- Input validation and error handling
- CORS enabled
- Security with Helmet middleware
- File upload support with Multer
- Morgan for HTTP request logging

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis

## Tech Stack

- TypeScript
- Express.js
- MongoDB with Mongoose
- Redis
- JWT for authentication
- Express Rate Limit
- Multer for file handling
- Morgan for logging
- CORS
- Helmet for security

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mathongo-backend-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/chapter-dashboard
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
JWT_SECRET=your_jwt_secret
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Project Structure

```
src/
├── controllers/    # Request handlers
├── models/        # Database models
├── routes/        # API routes
├── middleware/    # Custom middleware
├── utils/         # Utility functions
└── app.ts         # Application entry point
```

## API Documentation

[Postman API Documentation](https://www.postman.com/mathongo-backend-assignment/workspace/mathongo-backend-assignment/collection/27685742-a7c8c3d3-b994-42bd-8848-c7294fa9cebe?action=share&creator=27685742)

## Security Features

- JWT authentication
- Rate limiting
- Helmet security headers
- CORS protection
- Environment variables for sensitive data

## Development

The project uses nodemon for development, which automatically restarts the server when files change. TypeScript files are compiled on-the-fly using ts-node.

## Building for Production

The TypeScript code is compiled to JavaScript using the TypeScript compiler. The compiled code is output to the `dist` directory.

To build the project:
```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License. 