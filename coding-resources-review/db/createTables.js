const client = require('./db');

async function createTables(){
    try{
        console.log("Connecting to build tables for schema");

        // creating the user's table 
await client.query(`
    CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255)UNIQUE NOT NULL, 
    email VARCHAR(255)UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    isAdmin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `);

    // Creating Resources Table 
    await client.query(`
        CREATE TYPE resource_type AS ENUM ('video' , 'book', 'article');
        CREATE TABLE resources (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255 NOT NULL, 
        type resource_type NOT NULL,
        language VARCHAR(255) NOT NULL,
        description TEXT,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
        `);

        // Create the 'reviews' table 

        await client.query(`
            CREATE TABLE reviews (
            id SERIAL PRIMARY KEY, 
            user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
            resource_id INT NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
            rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
            comment TEXT, 
            create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            `);

            // Create the 'favorites' table
            await client.query(`
                CREATE TABLE favorites(
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL REFERENCESusers(id) ON DELETE CASCADE,
        resource_id INT NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
        CONSTRAINT unique_user_id_and_resource_id UNIQUE (user_id, resource_id)
      );
    `);

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
                