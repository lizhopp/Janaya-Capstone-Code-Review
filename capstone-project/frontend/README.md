# Capstone Project - Coding Resources Review Website

## Overview
This project is a full-stack application designed to provide a platform for users to review and share coding resources. It includes both a backend and a frontend, utilizing RESTful APIs for communication between the two.

## Technologies Used
- **Frontend**: React, JSX, CSS
- **Backend**: Node.js, Express, PostgreSQL
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Middleware**: Custom authentication middleware
- **Routing**: React Router for frontend navigation

## Features
- User registration and login with JWT authentication.
- Admin-only access to user profile dashboard.
- CRUD operations for coding resources and reviews.
- Search functionality for coding resources.
- Responsive design for an optimal user experience.

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd capstone-project
   ```

2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```

3. Set up the database:
   - Create a PostgreSQL database and update the `.env` file with your database credentials.
   - Run the SQL scripts in `db/schema.sql` and `db/seed.sql` to set up the database schema and seed initial data.

4. Start the backend server:
   ```
   npm run dev
   ```

5. Navigate to the frontend directory and install dependencies:
   ```
   cd ../frontend
   npm install
   ```

6. Start the frontend application:
   ```
   npm start
   ```

### API Endpoints

#### Authentication
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login and receive a JWT.
- **GET** `/api/auth/me`: Get current user details.

#### Resources
- **GET** `/api/resources`: Retrieve a list of all coding resources.
- **GET** `/api/resources/:id`: Fetch a single resource by ID.
- **POST** `/api/resources`: Add a new resource (authenticated users only).
- **PUT** `/api/resources/:id`: Edit a resource (admin/creator only).
- **DELETE** `/api/resources/:id`: Delete a resource (admin/creator only).

#### Reviews
- **POST** `/api/resources/:id/reviews`: Add a review for a resource.
- **GET** `/api/resources/:id/reviews`: Retrieve reviews for a resource.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.