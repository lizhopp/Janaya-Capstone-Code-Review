const client = require('./db');

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
    console.error('Error dropping tables:', error.message);
    throw error;
  }
}

// Run the function to drop tables
dropTables()
  .catch(console.error)
  .finally(() => client.end());