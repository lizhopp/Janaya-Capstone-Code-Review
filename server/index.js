const express = require('express');
const db = require('./db');// Import the database connection
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// AUTHENTICATION ROUTES 

// Register a new user
app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { username, password, name, location } = req.body;
    const newUser = await db.registerUser({ username, password, name, location });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

// Login an existing user
app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await db.loginUser({ username, password });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

// Get current user details
app.get('/api/auth/me', async (req, res, next) => {
  try {
    const user = await db.getCurrentUser(req.user.id); // Assuming `req.user` is set by authentication middleware
    res.json(user);
  } catch (err) {
    next(err);
  }
});


// Get all users
 app.get('/api/users', async (req, res, next) => {
   try {
     const users = await db.fetchUsers(); // Fetch users from the database
    res.json(users);
   } catch (err) {
     next(err);
   }
 });

 // RESOURCE ROUTES 

 // Get all coding resources
 app.get('/api/resources', async (req, res, next) => {
   try {
     const resources = await db.fetchResources(); // Fetch resources from the database
     res.json(resources);
  } catch (err) {
     next(err);
   }
 });

 // Get a single resource by ID
 app.get('/api/resources/:id', async (req, res, next) => {
   try {
     const resource = await db.fetchResourceById(req.params.id); // Fetch a resource by ID
     res.json(resource);
   } catch (err) {
     next(err);
   }
 });

 // Create a new resource (authenticated users only)
 app.post('/api/resources', async (req, res, next) => {
   try {
     const { title, description, url, user_id } = req.body;
     const newResource = await db.createResource({ title, description, url, user_id });
     res.status(201).json(newResource);
   } catch (err) {
     next(err);
   }
 });

// // Update a resource (admin/creator only)
 app.put('/api/resources/:id', async (req, res, next) => {
   try {
     const { id } = req.params;
     const { title, description, url } = req.body;
     const updatedResource = await db.updateResource(id, { title, description, url });
     res.json(updatedResource);
   } catch (err) {
     next(err);
   }
 });

 // Delete a resource (admin/creator only)
 app.delete('/api/resources/:id', async (req, res, next) => {
   try {
     await db.deleteResource(req.params.id); // Delete a resource by ID
     res.sendStatus(204);
   } catch (err) {
     next(err);
   }
 });

 // REVIEW ROUTES 

 // Get all reviews for a resource
 app.get('/api/resources/:id/reviews', async (req, res, next) => {
   try {
     const reviews = await db.fetchReviewsByResourceId(req.params.id); // Fetch reviews for a resource
    res.json(reviews);
   } catch (err) {
     next(err);
   }
 });

 // Create a review for a resource
 app.post('/api/resources/:id/reviews', async (req, res, next) => {
   try {
     const { id: resource_id } = req.params;
     const { user_id, content, rating } = req.body;
     const newReview = await db.createReview({ resource_id, user_id, content, rating });
     res.status(201).json(newReview);
   } catch (err) {
     next(err);
   }
 });

// // Error handling middleware
 app.use((err, req, res, next) => {
   console.error(err);
   res.status(500).json({ error: err.message });
 });

// // Initialize the server
  const init = async () => {
   try {
     await db.createTables(); // Ensure tables are created
    console.log('Connected to the database and tables created ');


 const PORT = process.env.PORT || 3000;

 app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
 });
  } catch (error) {
   console.error('Failed to initialize server');
 }
 };

init();
  