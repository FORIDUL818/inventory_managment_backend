# Inventory Management Backend

A Node.js/Express REST API backend for an Inventory Management System with user authentication.

## Features

- User Registration with role-based access (admin/user)
- RESTful API architecture
- MongoDB database integration using Mongoose
- JWT-based authentication ready
- Password hashing with bcrypt
- CORS enabled for cross-origin requests
- Input validation and error handling

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Token (JWT)
- **Password Hashing**: bcrypt
- **Environment Variables**: dotenv

## Project Structure

```
backend/
├── src/
│   ├── Controllers/
│   │   └── UserController.js     # User registration & login logic
│   ├── Middleware/
│   │   └── authMiddleware.js     # JWT authentication middleware
│   ├── Util/
│   │   └── jwtUtils.js           # JWT token generation & verification
│   ├── db/
│   │   └── db.js                 # MongoDB connection
│   ├── Model/
│   │   └── UserModel.js          # Mongoose user schema
│   ├── Routes/
│   │   └── AuthRoutes.js         # Authentication routes
├── app.js                        # Express app configuration
├── index.js                      # Application entry point
├── package.json                  # Dependencies
├── .env                          # Environment variables
└── README.md                     # Project documentation
```

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/inventory_db
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start MongoDB locally or use MongoDB Atlas

## Environment Variables

| Variable   | Description                         | Default                                |
| ---------- | ----------------------------------- | -------------------------------------- |
| PORT       | Server port number                  | 3000                                   |
| MONGO_URI  | MongoDB connection string           | mongodb://localhost:27017/inventory_db |
| JWT_SECRET | Secret key for JWT token generation | -                                      |

## Available Scripts

| Script        | Description                               |
| ------------- | ----------------------------------------- |
| `npm start`   | Start the production server               |
| `npm run dev` | Start the development server with nodemon |

## API Endpoints

### Authentication

| Method | Endpoint             | Description              | Auth Required |
| ------ | -------------------- | ------------------------ | ------------- |
| POST   | `/api/auth/register` | Register a new user      | No            |
| POST   | `/api/auth/login`    | User login (returns JWT) | No            |
| GET    | `/api/auth/me`       | Get current user profile | Yes           |

### Request Body (Register)

```json
{
  "username": "string (required)",
  "email": "string (required, unique)",
  "password": "string (required)",
  "role": "string (admin/user, default: user)"
}
```

### Response (Success - 201)

```json
{
  "message": "User registered successfully",
  "user": {
    "username": "string",
    "email": "string",
    "role": "string",
    "createdAt": "date"
  }
}
```

### Request Body (Login)

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

### Response (Login Success - 200)

```json
{
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "string",
    "createdAt": "date"
  }
}
```

> ℹ️ **Note**: Save the `token` value to use in subsequent authenticated requests.

### Error Responses

| Status Code | Description                                   |
| ----------- | --------------------------------------------- |
| 400         | Bad Request - Invalid input or missing fields |
| 500         | Internal Server Error                         |

## Server Information

- **Base URL**: `http://localhost:3000`
- **API Base**: `http://localhost:3000/api/auth`

## Database

- **MongoDB URI**: `mongodb://localhost:27017/inventory_db`

## User Schema

| Field     | Type   | Description                                     |
| --------- | ------ | ----------------------------------------------- |
| username  | String | User's display name (required)                  |
| email     | String | User's email (required, unique)                 |
| password  | String | Hashed password (required)                      |
| role      | String | User role - 'admin' or 'user' (default: 'user') |
| createdAt | Date   | Account creation timestamp                      |

## Getting Started

1. **Install MongoDB**: Download and install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/download-center/community)

2. **Start MongoDB**: Run `mongod` in your terminal to start the MongoDB server

3. **Configure Environment**: Create a `.env` file with your configuration

4. **Run the Server**:
   - Production: `npm start`
   - Development: `npm run dev`

5. **Test the API**: Use Postman or curl to test the registration endpoint

## Example Usage

### Register a new user

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

### Login user

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Access Protected Route

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Security Notes

> ⚠️ **Important**: The current implementation stores passwords in plaintext. For production use, implement bcrypt password hashing in the login controller to verify passwords securely.

## JWT Authentication

### How JWT Works

1. **Login**: User provides email and password
2. **Token Generation**: Server validates credentials and returns a JWT token
3. **Token Storage**: Client stores the token (localStorage, cookies, etc.)
4. **Protected Requests**: Client includes token in `Authorization` header

### Using Protected Routes

Include the JWT token in the request header:

```
Authorization: Bearer <your_jwt_token>
```

### Token Details

- **Expiration**: 24 hours
- **Payload Contains**: User ID, email, and role
- **Secret Key**: Stored in `.env` file as `JWT_SECRET`

## Contributing

- JWT token generation on login for stateless authentication
- Password hashing verification (bcrypt) for secure login
- Input validation middleware (e.g., express-validator)
- Role-based access control middleware
- Inventory CRUD operations
- Error logging and monitoring
- API documentation with Swagger
- Unit tests
- Refresh token mechanism

## License

ISC

## Author

Inventory Management Backend Team
