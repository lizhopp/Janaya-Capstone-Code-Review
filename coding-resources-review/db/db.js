const { Client } = require('pg');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || "superSecretKey";

// Initialize the PostgreSQL client
const client = new Client({
connectionString: process.env.DATABASE_URL || 'postgres://janayacooper:1116@localhost:5432/coding_review_db',
ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

// Connect to the database
client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Error connecting to PostgreSQL:', err));

  module.exports = client;



