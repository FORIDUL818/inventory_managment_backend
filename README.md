# Inventory Management Backend

A robust Node.js Express backend API for inventory management system with user authentication, built using MongoDB, JWT, and bcrypt.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Password Security**: Password hashing using bcrypt
- **User Profile Management**: Get and update user profiles
- **Role-based Access**: Support for multiple user roles (admin, user, manager, staff, etc.)
- **RESTful API**: Clean and consistent API endpoints
- **MongoDB Integration**: Flexible database with Mongoose ODM
- **CORS Support**: Cross-origin resource sharing enabled

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Environment Variables**: dotenv

## Project Structure

```
backend/
├── src/
│   ├── Controllers/
│   │   └── UserController.js    # User business logic
│   ├── db/
│   │   └── db.js               # MongoDB connection
│   ├── Middleware/
│   │   └── authMiddleware.js   # JWT authentication middleware
│   ├── Model/
│   │   └── UserModel.js        # Mongoose user schema
│   ├── Routes/
│   │   └── AuthRoutes.js       # Authentication routes
│   └── Util/
│       └── jwtUtils.js         # JWT utility functions
├── .env                         # Environment variables
├── .gitignore                   # Git ignore file
├── app.js                       # Express app configuration
├── index.js                     # Application entry point
├── package.json                 # Dependencies and scripts
└── README.md                    # Project documentation
```

## Installation

1. **Clone the repository**

   ```bash
   cd your-project-directory
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/inventory_db
   JWT_SECRET=your_secret_key_here
   ```

4. **Start MongoDB**

   Make sure MongoDB is running locally or update the `MONGO_URI` to point to your MongoDB instance.

5. **Run the application**
   - Development mode (with auto-restart):
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

6. **Verify server is running**

   The server will start on `http://localhost:3000` (or the port specified in .env)

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint                   | Description              | Protected |
| ------ | -------------------------- | ------------------------ | --------- |
| POST   | `/api/auth/register`       | Register a new user      | No        |
| POST   | `/api/auth/login`          | Login user and get JWT   | No        |
| GET    | `/api/auth/profile`        | Get current user profile | Yes       |
| POST   | `/api/auth/profile_update` | Update user profile      | Yes       |

### API Request/Response Examples

#### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "FirstName": "John",
  "LastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response (201):**

```json
{
  "message": "User registered successfully",
  "user": {
    "FirstName": "John",
    "LastName": "Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Login User

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "message": "User logged in successfully",
  "userdata": {
    "FirstName": "John",
    "LastName": "Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get Profile (Protected)

```bash
GET /api/auth/profile
Headers:
  token: <your_jwt_token>
```

**Response (200):**

```json
{
  "data": {
    "FirstName": "John",
    "LastName": "Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Profile (Protected)

```bash
POST /api/auth/profile_update
Headers:
  token: <your_jwt_token>
Content-Type: application/json

{
  "FirstName": "Jane",
  "LastName": "Smith"
}
```

**Response (200):**

```json
{
  "status": "success",
  "message": "Profile updated successfully"
}
```

## User Model Schema

| Field     | Type    | Required | Description                    |
| --------- | ------- | -------- | ------------------------------ |
| FirstName | String  | Yes      | User's first name (3-20 chars) |
| LastName  | String  | Yes      | User's last name (3-20 chars)  |
| email     | String  | Yes      | Unique email address           |
| password  | String  | Yes      | Hashed password (min 6 chars)  |
| role      | String  | No       | User role (default: "user")    |
| isActive  | Boolean | No       | Account status (default: true) |
| createdAt | Date    | Auto     | Creation timestamp             |

### Supported Roles

`admin`, `user`, `manager`, `staff`, `sales`, `support`, `customer`, `guest`, `editor`, `contributor`, `moderator`, `analyst`, `developer`, `designer`, `tester`, `operator`, `consultant`, `director`, `executive`

## Error Responses

All endpoints may return the following error responses:

| Status Code | Description                             |
| ----------- | --------------------------------------- |
| 400         | Bad Request - Validation error          |
| 401         | Unauthorized - Invalid or missing token |
| 404         | Not Found - User not found              |
| 500         | Server Error - Internal server error    |

## Available Scripts

| Script        | Description                           |
| ------------- | ------------------------------------- |
| `npm start`   | Start the production server           |
| `npm run dev` | Start development server with nodemon |

## Dependencies

- **express**: ^5.2.1 - Web framework
- **mongoose**: ^9.3.0 - MongoDB ODM
- **bcrypt**: ^6.0.0 - Password hashing
- **jsonwebtoken**: ^9.0.3 - JWT authentication
- **cors**: ^2.8.6 - CORS support
- **dotenv**: ^17.3.1 - Environment variables

## License

ISC License

## Author

Your Name Here
