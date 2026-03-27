# User Routes API Documentation

This document describes the user-related API endpoints defined in `routes/userRoute.js`.

## Base URL

The server runs on `http://localhost:3001` (or the port specified in `process.env.Port`).

**Note**: Ensure the routes are properly mounted in `index.js`. Currently, the `userRoute` is imported but not used with `app.use()`. You may need to add:

```javascript
app.use("/user", userRoute);
```

This would make the endpoints available at `/user/register` and `/user/login`.

## Endpoints

### 1. Register User

Register a new user account.

- **URL**: `/register` (or `/user/register` if mounted)
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "username": "johndoe",
  "role": "user" // optional, defaults to "user"
}
```

#### Validation Rules

- `email`: Must be a valid email address
- `password`: Must be at least 6 characters long
- `name`: Must be at least 3 characters long
- `username`: Must be at least 3 characters long

#### Success Response (200)

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

#### Error Responses

- **400 Bad Request**: Validation errors
  ```json
  {
    "errors": [
      {
        "msg": "Please enter a valid email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```
- **409 Conflict**: User already exists
  ```json
  {
    "success": false,
    "message": "User already exists"
  }
  ```
- **500 Internal Server Error**: Server error
  ```json
  {
    "success": false,
    "message": "Error in registering user",
    "error": "..."
  }
  ```

### 2. Login User

Authenticate a user and receive a JWT token.

- **URL**: `/login` (or `/user/login` if mounted)
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Validation Rules

- `email`: Must be a valid email address
- `password`: Must be at least 6 characters long

#### Success Response (200)

```json
{
  "success": true,
  "message": "Login Successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Responses

- **400 Bad Request**: Validation errors
- **401 Unauthorized**: Invalid credentials
  ```json
  {
    "success": false,
    "message": "User does not exist"
  }
  ```
  or
  ```json
  {
    "success": false,
    "message": "Incorrect password"
  }
  ```
- **500 Internal Server Error**: Server error

## Testing the Endpoints

You can test these endpoints using tools like Postman, Insomnia, or curl commands.

### Prerequisites

1. Ensure the server is running: `npm start` or `node index.js`
2. Have a MongoDB connection configured
3. Set up environment variables (JWT_SECRET, etc.)

### Sample curl Commands

#### Register a new user:

```bash
curl -X POST http://localhost:3001/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "username": "testuser"
  }'
```

#### Login with the registered user:

```bash
curl -X POST http://localhost:3001/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Test validation (invalid email):

```bash
curl -X POST http://localhost:3001/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email",
    "password": "123",
    "name": "Test",
    "username": "test"
  }'
```

### Using the JWT Token

After successful login, use the returned token in the Authorization header for protected routes:

```
Authorization: Bearer <token>
```

## Dependencies

- Express.js
- express-validator
- bcryptjs
- jsonwebtoken
- mongoose

## Notes

- Passwords are hashed using bcrypt before storage
- JWT tokens expire after 24 hours
- User roles can be "user", "mentor", or "admin"
