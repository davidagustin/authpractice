# API Documentation

## Overview

AuthPractice provides a RESTful API for managing authentication and user data. The API is built using Next.js API routes and follows REST conventions.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://authpractice.com/api`

## Authentication

Currently, the API uses session-based authentication. JWT-based authentication is planned for future releases.

## Endpoints

### Health Check

#### GET `/api/health`

Check the health status of the application.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "0.1.5"
}
```

**Status Codes:**
- `200` - Application is healthy
- `503` - Application is unhealthy

---

### Ready Check

#### GET `/api/ready`

Check if the application is ready to serve requests.

**Response:**
```json
{
  "ready": true,
  "database": "connected",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Status Codes:**
- `200` - Application is ready
- `503` - Application is not ready

---

### Metrics

#### GET `/api/metrics`

Get application metrics in Prometheus format.

**Response:**
```
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET",status="200"} 1234
http_requests_total{method="POST",status="201"} 567

# HELP http_request_duration_seconds HTTP request duration in seconds
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{le="0.1"} 1000
http_request_duration_seconds_bucket{le="0.5"} 1200
http_request_duration_seconds_bucket{le="1"} 1250
```

**Status Codes:**
- `200` - Metrics retrieved successfully

---

### Todos

#### GET `/api/todos`

Get all todos for the current user.

**Headers:**
```
Content-Type: application/json
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "completed": false,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  },
  {
    "id": 2,
    "title": "Review code changes",
    "completed": true,
    "created_at": "2024-01-14T15:45:00Z",
    "updated_at": "2024-01-15T09:20:00Z"
  }
]
```

**Status Codes:**
- `200` - Todos retrieved successfully
- `401` - Unauthorized
- `500` - Internal server error

---

#### POST `/api/todos`

Create a new todo.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New todo item",
  "description": "Optional description"
}
```

**Response:**
```json
{
  "id": 3,
  "title": "New todo item",
  "description": "Optional description",
  "completed": false,
  "created_at": "2024-01-15T11:00:00Z",
  "updated_at": "2024-01-15T11:00:00Z"
}
```

**Status Codes:**
- `201` - Todo created successfully
- `400` - Invalid request data
- `401` - Unauthorized
- `500` - Internal server error

---

#### GET `/api/todos/{id}`

Get a specific todo by ID.

**Parameters:**
- `id` (path) - Todo ID

**Response:**
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation",
  "completed": false,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Status Codes:**
- `200` - Todo retrieved successfully
- `404` - Todo not found
- `401` - Unauthorized
- `500` - Internal server error

---

#### PUT `/api/todos/{id}`

Update a specific todo.

**Parameters:**
- `id` (path) - Todo ID

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated todo title",
  "description": "Updated description",
  "completed": true
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Updated todo title",
  "description": "Updated description",
  "completed": true,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T11:15:00Z"
}
```

**Status Codes:**
- `200` - Todo updated successfully
- `400` - Invalid request data
- `404` - Todo not found
- `401` - Unauthorized
- `500` - Internal server error

---

#### DELETE `/api/todos/{id}`

Delete a specific todo.

**Parameters:**
- `id` (path) - Todo ID

**Response:**
```json
{
  "message": "Todo deleted successfully"
}
```

**Status Codes:**
- `200` - Todo deleted successfully
- `404` - Todo not found
- `401` - Unauthorized
- `500` - Internal server error

---

### Users

#### GET `/api/users/me`

Get current user information.

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Status Codes:**
- `200` - User information retrieved successfully
- `401` - Unauthorized
- `500` - Internal server error

---

## Error Responses

All error responses follow a consistent format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {
      "field": "title",
      "issue": "Title is required"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "request_id": "req_123456789"
}
```

### Common Error Codes

- `VALIDATION_ERROR` - Request data validation failed
- `NOT_FOUND` - Resource not found
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Access denied
- `INTERNAL_ERROR` - Internal server error
- `RATE_LIMITED` - Too many requests

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Authenticated users**: 1000 requests per hour
- **Unauthenticated users**: 100 requests per hour

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642233600
```

## Pagination

List endpoints support pagination using query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)

**Example:**
```
GET /api/todos?page=2&limit=10
```

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 10,
    "total": 45,
    "pages": 5,
    "has_next": true,
    "has_prev": true
  }
}
```

## Filtering and Sorting

List endpoints support filtering and sorting:

### Filtering

- `completed` - Filter by completion status
- `created_after` - Filter by creation date
- `created_before` - Filter by creation date

**Example:**
```
GET /api/todos?completed=false&created_after=2024-01-01
```

### Sorting

- `sort_by` - Field to sort by (title, created_at, updated_at)
- `sort_order` - Sort order (asc, desc)

**Example:**
```
GET /api/todos?sort_by=created_at&sort_order=desc
```

## Webhooks

Webhook support is planned for future releases to notify external systems of events:

- Todo created
- Todo updated
- Todo deleted
- User registered
- User updated

## SDKs and Libraries

Official SDKs and libraries are planned for:

- JavaScript/TypeScript
- Python
- Go
- Java

## Changelog

### v0.1.5 (Current)
- Added health check endpoint
- Added ready check endpoint
- Added metrics endpoint
- Improved error handling
- Added request ID tracking

### v0.1.0
- Initial API release
- Basic CRUD operations for todos
- User management endpoints

## Support

For API support and questions:

1. Check the [documentation](docs/)
2. Review [examples](../../examples/)
3. Create an issue for bugs or feature requests
4. Contact the development team 