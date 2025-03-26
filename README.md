# Capstone Project: Coding Resources Review Website

## Overview
This project is a full-stack web application designed to provide a platform for users to review and share coding resources. It includes both a backend and a frontend, utilizing RESTful APIs for communication between the two.

## Features
- User authentication (registration and login)
- CRUD operations for coding resources
- CRUD operations for reviews associated with resources
- Search functionality for coding resources
- User profile dashboard accessible only to admins
- Responsive and user-friendly design

## Technologies Used
- **Backend:**
  - Node.js
  - Express.js
  - PostgreSQL
  - JWT for authentication
  - bcrypt for password hashing
  - dotenv for environment variables
  - morgan for logging
  - nodemon for development

- **Frontend:**
  - React.js
  - React Router for navigation
  - CSS for styling

## Project Structure
```
capstone-project
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── db
│   │   └── app.js
│   ├── .env
│   ├── package.json
│   ├── nodemon.json
│   └── README.md
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── styles
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Getting Started

### Backend Setup
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file and configure your database connection.
4. Run the server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Run the frontend application:
   ```
   npm start
   ```

## API Endpoints

### Authentication
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login an existing user.
- **GET** `/api/auth/me`: Get current user details.

### Resources
- **GET** `/api/resources`: Retrieve all coding resources.
- **GET** `/api/resources/:id`: Fetch a single resource.
- **POST** `/api/resources`: Add a new resource (authenticated users only).
- **PUT** `/api/resources/:id`: Edit a resource (admin/creator only).
- **DELETE** `/api/resources/:id`: Delete a resource (admin/creator only).

### Reviews
- **POST** `/api/resources/:id/reviews`: Add a review for a resource.
- **GET** `/api/resources/:id/reviews`: Retrieve reviews for a resource.

## Testing
Use Postman to test the API endpoints and ensure all functionalities are working as expected.

## Conclusion
This project serves as a comprehensive platform for users to discover and review coding resources, enhancing their learning experience. The combination of a robust backend and an intuitive frontend aims to provide a seamless user experience.