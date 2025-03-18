const bcrypt = require('bcrypt');
const client = require('./db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT || "Crytobytes";

async function createUser({ username, email, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows: [user] } = await client.query(`
      INSERT INTO users(username, email, password) 
      VALUES($1, $2, $3) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, email, hashedPassword]);

    if (!user) throw new Error('Username already exists');
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

async function updateUser(id, fields = {}) {
  const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
  if (!setString.length) throw new Error('No fields to update');

  try {
    const { rows: [user] } = await client.query(`
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `, Object.values(fields));

    return user;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query('SELECT id, username, email FROM users;');
    return rows;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
}

async function getUserById(userId) {
  try {
    const { rows: [user] } = await client.query('SELECT id, username, email FROM users WHERE id=$1;', [userId]);
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
}

async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query('SELECT * FROM users WHERE username=$1;', [username]);
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
}

async function authenticateUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid password');
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
  } catch (error) {
    throw new Error(`Error authenticating user: ${error.message}`);
  }
}

module.exports = {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  authenticateUser,
};