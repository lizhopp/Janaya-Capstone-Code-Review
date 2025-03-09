
const {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  createResource,
  updateResource,
  getAllResources,
  getResourceById,
  createReview,
  getReviewsByResourceId,
  addFavorite,
  removeFavorite,
  getFavoritesByUserId,
} = require('./index');

/**
 * Drop Tables
 */
async function dropTables() {
  try {
    console.log('Starting to drop tables...');

    await client.query(`
      DROP TABLE IF EXISTS favorites;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS resources;
      DROP TABLE IF EXISTS users;
    `);

    console.log('Finished dropping tables!');
  } catch (error) {
    console.error('Error dropping tables!');
    throw error;
  }
}

/**
 * Create Tables
 */
async function createTables() {
  try {
    console.log('Starting to build tables...');

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

      CREATE TABLE resources (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        type ENUM('video', 'book', 'article') NOT NULL,
        language VARCHAR(255) NOT NULL,
        link VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        resource_id INT NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
        rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE favorites (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        resource_id INT NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
        CONSTRAINT unique_user_id_and_resource_id UNIQUE (user_id, resource_id)
      );
    `);

    console.log('Finished building tables!');
  } catch (error) {
    console.error('Error building tables!');
    throw error;
  }
}

/**
 * Seed Initial Users
 */
async function createInitialUsers() {
  try {
    console.log('Starting to create users...');

    await createUser({
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'password',
    });
    await createUser({
      username: 'guestuser',
      email: 'guestuser@gmail.com',
      password: 'password',
    });
    await createUser({
      username: 'testuser',
      email: 'testuser@gmail.com',
      password: 'password',
    });

    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

/**
 * Seed Initial Resources
 */
async function createInitialResources() {
  try {
    const [admin, guestuser, testuser] = await getAllUsers();

    console.log('Starting to create resources...');
    await createResource({
      title: 'React Tutorial',
      type: 'video',
      language: 'JavaScript',
      link: 'https://reactjs.org/tutorial',
      description: 'Learn React basics',
    });
    await createResource({
      title: 'Eloquent JavaScript',
      type: 'book',
      language: 'JavaScript',
      link: 'https://eloquentjavascript.net',
      description: 'A great book on JavaScript',
    });
    await createResource({
      title: 'Node.js Guide',
      type: 'article',
      language: 'JavaScript',
      link: 'https://nodejs.org/guide',
      description: 'Official Node.js guide',
    });

    console.log('Finished creating resources!');
  } catch (error) {
    console.error('Error creating resources!');
    throw error;
  }
}

/**
 * Seed Initial Reviews
 */
async function createInitialReviews() {
  try {
    const [guestuser, testuser] = await getAllUsers();
    const [reactTutorial, eloquentJS, nodeGuide] = await getAllResources();

    console.log('Starting to create reviews...');
    await createReview({
      userId: guestuser.id,
      resourceId: reactTutorial.id,
      rating: 5,
      comment: 'Great tutorial!',
    });
    await createReview({
      userId: testuser.id,
      resourceId: eloquentJS.id,
      rating: 4,
      comment: 'Very informative book',
    });
    await createReview({
      userId: guestuser.id,
      resourceId: nodeGuide.id,
      rating: 3,
      comment: 'Good guide but could be more detailed',
    });

    console.log('Finished creating reviews!');
  } catch (error) {
    console.error('Error creating reviews!');
    throw error;
  }
}

/**
 * Seed Initial Favorites
 */
async function createInitialFavorites() {
  try {
    const [guestuser, testuser] = await getAllUsers();
    const [reactTutorial, eloquentJS] = await getAllResources();

    console.log('Starting to create favorites...');
    await addFavorite({
      userId: user1.id,
      resourceId: reactTutorial.id,
    });
    await addFavorite({
      userId: user2.id,
      resourceId: eloquentJS.id,
    });

    console.log('Finished creating favorites!');
  } catch (error) {
    console.error('Error creating favorites!');
    throw error;
  }
}

/**
 * Rebuild Database
 */
async function rebuildDB() {
  try {
    await client.connect();
    console.log('Connected to the database');
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialResources();
    await createInitialReviews();
    await createInitialFavorites();
  } catch (error) {
    console.error('Error rebuilding database!');
    throw error;
  }
}

/**
 * Test Database
 */
async function testDB() {
  try {
    console.log('Starting to test database...');

    console.log('Calling getAllUsers');
    const users = await getAllUsers();
    console.log('Result:', users);

    console.log('Calling updateUser on users[0]');
    const updateUserResult = await updateUser(users[0].id, {
      username: 'newadmin',
    });
    console.log('Result:', updateUserResult);

    console.log('Calling getAllResources');
    const resources = await getAllResources();
    console.log('Result:', resources);

    console.log('Calling updateResource on resources[0]');
    const updateResourceResult = await updateResource(resources[0].id, {
      title: 'React Basics',
    });
    console.log('Result:', updateResourceResult);

    console.log('Calling getResourceById with 1');
    const resource = await getResourceById(1);
    console.log('Result:', resource);

    console.log('Calling getReviewsByResourceId with 1');
    const reviews = await getReviewsByResourceId(1);
    console.log('Result:', reviews);

    console.log('Calling getFavoritesByUserId with 1');
    const favorites = await getFavoritesByUserId(1);
    console.log('Result:', favorites);

    console.log('Finished database tests!');
  } catch (error) {
    console.error('Error during testDB');
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());

