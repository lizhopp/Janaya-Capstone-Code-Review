const { Client } = require('pg');
require('dotenv').config();

// Initialize the PostgreSQL client
const client = new Client({
connectionString: process.env.DATABASE_URL || 'postgres://janayacooper:1116@localhost:5432/coding_review_db'
});

// Connect to the database
client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Error connecting to PostgreSQL:', err));

module.exports = client;





