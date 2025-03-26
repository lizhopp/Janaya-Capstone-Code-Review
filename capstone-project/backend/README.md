# Capstone Project - Coding Resources Review Website

## Overview
This project is a full-stack application designed to provide a platform for users to review and share coding resources. It includes both a backend and a frontend, utilizing RESTful APIs for communication between the two.

## Technologies Used
- **Backend**: Node.js, Express, PostgreSQL
- **Frontend**: React, JSX, CSS
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Middleware**: Custom authentication middleware
- **Development Tools**: Nodemon, Postman

## Features
- User registration and login with JWT authentication
- CRUD operations for coding resources
- CRUD operations for reviews associated with resources
- Search functionality for coding resources
- User profile dashboard accessible only to admin users
- Responsive and user-friendly design

## Project Structure
```
capstone-project
/backend
  ├── /db
  │   ├── index.js (PostgreSQL pool setup)
  │   ├── db.js(DB schema)
  │   ├── seed.js (Seed data)
  ├── /models
  │   ├── userModel.js
  │   ├── resourceModel.js
  │   ├── reviewModel.js
  ├── /controllers
  │   ├── authController.js
  │   ├── resourceController.js
  │   ├── reviewController.js
  ├── /routes
  │   ├── authRoutes.js
  │   ├── resourceRoutes.js
  │   ├── reviewRoutes.js
  ├── /middleware
  │   ├── authMiddleware.js (JWT/auth checks)
  │   ├── adminMiddleware.js (isAdmin checks)
  ├── app.js (Express setup)
  ├── server.js (Start server)

  /frontend
  ├── /src
  │   ├── /components
  │   │   ├── Navbar.jsx
  │   │   ├── ResourceCard.jsx
  │   │   ├── SearchBar.jsx
  │   ├── /pages
  │   │   ├── Home.jsx
  │   │   ├── Login.jsx
  │   │   ├── Register.jsx
  │   │   ├── Dashboard.jsx (admin-only)
  │   ├── /context (for auth state)
  │   ├── App.jsx (Router setup)
  │   ├── index.css
```

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the `backend` directory and configure your database connection.
4. Run the database schema and seed files using a PostgreSQL client.
5. Start the server:
   ```
   npm run dev
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend application:
   ```
   npm start
   ```

## API Endpoints

### Authentication
- **POST** `/api/auth/register`: Register a new user
- **POST** `/api/auth/login`: Login an existing user
- **GET** `/api/auth/me`: Get current user details

### Resources
- **GET** `/api/resources`: Retrieve all coding resources
- **GET** `/api/resources/:id`: Retrieve a single resource
- **POST** `/api/resources`: Add a new resource (authenticated users only)
- **PUT** `/api/resources/:id`: Update a resource (admin/creator only)
- **DELETE** `/api/resources/:id`: Delete a resource (admin/creator only)

### Reviews
- **POST** `/api/reviews`: Add a review for a resource
- **GET** `/api/reviews/:resourceId`: Retrieve reviews for a specific resource

## Testing
Use Postman to test the API endpoints. Ensure to include the JWT token in the Authorization header for protected routes.

## Conclusion
This project serves as a comprehensive platform for users to discover, review, and share coding resources, showcasing both backend and frontend development skills.