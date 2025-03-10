const { Client } = require('pg')// imports the pg
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT || "Crytobytes";
require("dotenv").config()
const express = require('express');
const app = express(); // Define the app


// middleware 
app.use(express.json());


// Initialize the client
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost/coding_resources_db',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});



/**
 * USER Methods
 */

// Create a new user
async function createUser({ username, email, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows: [user] } = await client.query(`
      INSERT INTO users(username, email, password) 
      VALUES($1, $2, $3) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, email, hashedPassword]);

    if (!user) {
      throw new Error('Username already exists. Please create a different username.');
    }
    return user;
  } catch (error) {
    console.error('Error in creating user:', error.message);
    throw error;
  }
}

// Update a user
async function updateUser(id, fields = {}) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index + 1}`
  ).join(', ');

  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [user] } = await client.query(`
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `, Object.values(fields));

    return user;
  } catch (error) {
    throw error;
  }
}

// Get all users
async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT id, username, email FROM users;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Get user by ID
async function getUserById(userId) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT id, username, email FROM users WHERE id=${userId};
    `);

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that id does not exist"
      };
    }
    return user;
  } catch (error) {
    throw error;
  }
}

// Get user by username
async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT * FROM users WHERE username=$1;
    `, [username]);

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that username does not exist"
      };
    }
    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * RESOURCE Methods
 */

// Create a new resource
async function createResource({ title, type, language, link, description }) {
  try {
    const { rows: [resource] } = await client.query(`
      INSERT INTO resources(title, type, language, link, description) 
      VALUES($1, $2, $3, $4, $5) 
      RETURNING *;
    `, [title, type, language, link, description]);

    return resource;
  } catch (error) {
    console.error('Error in creating resource:', error.message);
    throw error;
  }
}

// Update a resource
async function updateResource(resourceId, fields = {}) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index + 1}`
  ).join(', ');

  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [resource] } = await client.query(`
      UPDATE resources
      SET ${setString}
      WHERE id=${resourceId}
      RETURNING *;
    `, Object.values(fields));

    return resource;
  } catch (error) {
    throw error;
  }
}

// Get all resources
async function getAllResources() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM resources;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Get resource by ID
async function getResourceById(resourceId) {
  try {
    const { rows: [resource] } = await client.query(`
      SELECT * FROM resources WHERE id=$1;
    `, [resourceId]);

    if (!resource) {
      throw {
        name: "ResourceNotFoundError",
        message: "A resource with that id does not exist"
      };
    }
    return resource;
  } catch (error) {
    throw error;
  }
}

// Delete a resource
async function deleteResource(resourceId) {
  try {
    const { rows: [resource] } = await client.query(`
      DELETE FROM resources WHERE id=$1 RETURNING *;
    `, [resourceId]);

    if (!resource) {
      throw new Error('Resource not found');
    }
    return resource;
  } catch (error) {
    console.error('Error in deleting resource:', error.message);
    throw error;
  }
}

/**
 * REVIEW Methods
 */

// Create a new review
async function createReview({ userId, resourceId, rating, comment }) {
  try {
    const { rows: [review] } = await client.query(`
      INSERT INTO reviews(user_id, resource_id, rating, comment) 
      VALUES($1, $2, $3, $4) 
      RETURNING *;
    `, [userId, resourceId, rating, comment]);

    return review;
  } catch (error) {
    console.error('Error in creating review:', error.message);
    throw error;
  }
}

// Get reviews by resource ID
async function getReviewsByResourceId(resourceId) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM reviews WHERE resource_id=$1;
    `, [resourceId]);
    return rows;
  } catch (error) {
    throw error;
  }
}

/**
 * FAVORITE Methods
 */

// Add a favorite
async function addFavorite({ userId, resourceId }) {
  try {
    const { rows: [favorite] } = await client.query(`
      INSERT INTO favorites(user_id, resource_id) 
      VALUES($1, $2) 
      RETURNING *;
    `, [userId, resourceId]);

    return favorite;
  } catch (error) {
    console.error('Error in adding favorite:', error.message);
    throw error;
  }
}

// Remove a favorite
async function removeFavorite({ userId, resourceId }) {
  try {
    const { rows: [favorite] } = await client.query(`
      DELETE FROM favorites WHERE user_id=$1 AND resource_id=$2 RETURNING *;
    `, [userId, resourceId]);

    if (!favorite) {
      throw new Error('Favorite not found');
    }
    return favorite;
  } catch (error) {
    console.error('Error in removing favorite:', error.message);
    throw error;
  }
}

// Get favorites by user ID
async function getFavoritesByUserId(userId) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM favorites WHERE user_id=$1;
    `, [userId]);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  createResource,
  updateResource,
  getAllResources,
  getResourceById,
  deleteResource,
  createReview,
  getReviewsByResourceId,
  addFavorite,
  removeFavorite,
  getFavoritesByUserId
};

