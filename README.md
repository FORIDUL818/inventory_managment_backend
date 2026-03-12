# Inventory Management Backend

A Node.js/Express REST API backend for an Inventory Management System with user authentication.

## Features

- User Registration with role-based access (admin/user)
- RESTful API architecture
- MongoDB database integration using Mongoose
- JWT-based authentication ready
- Password hashing with bcrypt
- CORS enabled for cross-origin requests

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Token (JWT)
- **Password Hashing**: bcrypt

## Project Structure

```
backend/
├── src/
│   ├── Controllers/
│   │   └── UserController.js     # User registration logic
│   ├── db/
│   │   └── db.js                 # MongoDB connection
│   ├── Model/
│   │   └── UserModel.js          # Mongoose user schema
│   ├── Routes/
│   │   └── AuthRoutes.js        # Authentication routes
│   └── Util/
├── app.js                        # Express app configuration
├── index.js                      # Application entry point
├── package.json                  # Dependencies
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

## Available Scripts

| Script        | Description                               |
| ------------- | ----------------------------------------- |
| `npm start`   | Start the production server               |
| `npm run dev` | Start the development server with nodemon |

## API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |

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

## License

ISC
