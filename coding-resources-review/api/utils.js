const client = require('../db'); // Adjust the path based on your folder structure
const bcrypt = require('bcrypt');

async function hashPasswords() {
  try {
    const users = await client.query('SELECT id, password FROM users');
    for (const user of users.rows) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await client.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, user.id]);
    }
    console.log('Passwords hashed successfully!');
  } catch (error) {
    console.error('Error hashing passwords:', error.message);
    throw error;
  } finally {
    client.end();
  }
}

module.exports = {
  hashPasswords
};