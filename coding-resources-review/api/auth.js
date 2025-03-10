const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');

// JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to set `req.user` if possible
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    // No token provided, proceed without a user
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      // Verify the token and extract the user ID
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        // Fetch the user and attach it to the request object
        req.user = await getUserById(id);
        next();
      } else {
        next({
          name: 'AuthorizationHeaderError',
          message: 'Authorization token malformed',
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

// Log the user if set
apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log('User is set:', req.user);
  }
  next();
});

// Import and use the routes
const usersRouter = require('./users');
const resourcesRouter = require('./resources');
const reviewsRouter = require('./reviews');
const favoritesRouter = require('./favorites');

apiRouter.use('/users', usersRouter);
apiRouter.use('/resources', resourcesRouter);
apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/favorites', favoritesRouter);

// Error handling middleware
apiRouter.use((error, req, res, next) => {
  res.status(500).json({
    name: error.name,
    message: error.message,
  });
});

module.exports = apiRouter;