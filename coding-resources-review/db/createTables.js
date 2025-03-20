
const client = require('./db');

async function createTables() {
  try {
    console.log('Starting to build tables...');

    // Check if the 'users' table exists
    const usersTableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM pg_tables
        WHERE schemaname = 'public' AND tablename = 'users'
      );
    `);

    if (!usersTableExists.rows[0].exists) {
      await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          isAdmin BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('Created "users" table');
    }

    // Check if the 'resource_type' type exists
    const resourceTypeExists = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'resource_type'
      );
    `);

    if (!resourceTypeExists.rows[0].exists) {
      await client.query(`
        CREATE TYPE resource_type AS ENUM ('video', 'book', 'article');
      `);
      console.log('Created "resource_type" enum');
    }

    // Check if the 'resources' table exists
    const resourcesTableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM pg_tables
        WHERE schemaname = 'public' AND tablename = 'resources'
      );
    `);

    if (!resourcesTableExists.rows[0].exists) {
      await client.query(`
        CREATE TABLE resources (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          type resource_type NOT NULL,
          language VARCHAR(255) NOT NULL,
          link VARCHAR(255) NOT NULL,
          description TEXT,
          product_id INT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('Created "resources" table');
    }

    // Check if the 'reviews' table exists
    const reviewsTableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM pg_tables
        WHERE schemaname = 'public' AND tablename = 'reviews'
      );
    `);

    if (!reviewsTableExists.rows[0].exists) {
      await client.query(`
        CREATE TABLE reviews (
          id SERIAL PRIMARY KEY,
          user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          resource_id INT NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
          rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
          comment TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('Created "reviews" table');
    }

    // Check if the 'favorites' table exists
    const favoritesTableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM pg_tables
        WHERE schemaname = 'public' AND tablename = 'favorites'
      );
    `);

    if (!favoritesTableExists.rows[0].exists) {
      await client.query(`
        CREATE TABLE favorites (
          id SERIAL PRIMARY KEY,
          user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          resource_id INT NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
          CONSTRAINT unique_user_id_and_resource_id UNIQUE (user_id, resource_id)
        );
      `);
      console.log('Created "favorites" table');
    }

    console.log('Finished building tables!');
  } catch (error) {
    console.error('Error building tables:', error.message);
    throw error;
  }
}

// Run the function to create tables
createTables()
  .catch(console.error)
  .finally(() => client.end());



