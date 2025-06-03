# Chapter Performance Dashboard Backend

A RESTful API backend for managing chapter performance data with features like filtering, caching, and rate limiting.

## Features

- RESTful API endpoints for managing chapters
- MongoDB for data persistence
- Redis for caching and rate limiting
- TypeScript for type safety
- Input validation and error handling
- API documentation with Postman collection

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
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
```

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## API Endpoints

### GET /api/v1/chapters
Get all chapters with optional filters:
- class
- unit
- status
- weakChapters
- subject
- page (default: 1)
- limit (default: 10)

### GET /api/v1/chapters/:id
Get a specific chapter by ID

### POST /api/v1/chapters
Upload chapters from a JSON file

## Rate Limiting

The API is rate-limited to 30 requests per minute per IP address using Redis.

## Caching

GET requests to /api/v1/chapters are cached for 1 hour using Redis. The cache is automatically invalidated when new chapters are added.

## Error Handling

The API returns appropriate HTTP status codes and error messages in the following format:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error message (only in development)"
}
```

## Success Response Format

```json
{
  "success": true,
  "data": {
    // Response data
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License. 