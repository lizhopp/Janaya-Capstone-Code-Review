require("dotenv").config({ path: "./db/.env" });
const JWT_SECRET = process.env.JWT_SECRET || "Crytobytes";
const express = require("express");
const client = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;


// middleware
// app.use(cors());
app.use(express.json());

//  root route
app.get("/", (req, res) => {
  res.send("Welcome to the Coding Resource Review API 🚀");
});

// Routes for resources

app.get('/api/resources/me', authenticate, async (req, res) => {
  try {
    const result = await client.query(`
      SELECT reviews.id, reviews.rating, reviews.comment, resources.title
      FROM reviews
      JOIN resources ON reviews.resource_id = resources.id
      WHERE reviews.user_id = $1;
    `, [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching user reviews:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/resources', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM resources');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching resources:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/resources/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query('SELECT * FROM resources WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching resource:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/resources', authenticate, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Forbidden' });

  const { title, type, language, link, description, product_id } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO resources (title, type, language, link, description, product_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, type, language, link, description, product_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating resource:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Routes for reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM reviews');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching all reviews:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/resources/reviews', authenticate, async (req, res) => {
  try {
    const result = await client.query(`
      SELECT reviews.id, reviews.rating, reviews.comment, resources.title
      FROM reviews
      JOIN resources ON reviews.resource_id = resources.id
      WHERE reviews.user_id = $1;
    `, [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/resources/:id/reviews', async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching reviews for resource ID: ${id}`); // Debugging
  try {
    const result = await client.query('SELECT * FROM reviews WHERE resource_id = $1', [id]);
    console.log('Query result:', result.rows); // Debugging
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/resources/:id/reviews', authenticate, async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO reviews (user_id, resource_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, id, rating, comment]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding review:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/reviews/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    const result = await client.query(
      'UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [rating, comment, id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found or unauthorized' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating review:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/reviews/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('DELETE FROM reviews WHERE id = $1 AND user_id = $2 RETURNING *', [id, req.user.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found or unauthorized' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting review:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Routes for favorites 

app.get('/api/favorites', authenticate, async (req, res) => {
  try {
    const result = await client.query(`
      SELECT favorites.id, resources.title, resources.description, resources.link
      FROM favorites
      JOIN resources ON favorites.resource_id = resources.id
      WHERE favorites.user_id = $1;
    `, [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching favorites:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Routes for authentication
app.get('/api/auth/me', authenticate, async (req, res) => {
  try {
    const result = await client.query('SELECT id, username, email FROM users WHERE id = $1', [req.user.id]);
    const user = result.rows[0];
    res.json(user);
  } catch (error) {
    console.error('Error retrieving user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required.' });
  }

  try {
    // Check if the username or email already exists
    const existingUser = await client.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username or email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const result = await client.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    // Generate a JWT token
    const user = result.rows[0];
    console.log('User:', user); // Debugging: Log the user object
    console.log('JWT_SECRET:', process.env.JWT_SECRET); // Debugging: Log the JWT secret
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated Token:', token); // Debugging: Log the token

    // Return the token
    res.json({ token });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Middleware to authenticate requests
function authenticate(req, res, next) {
  const authHeader = req.header('Authorization');
  const token =  authHeader && authHeader.startsWith('Bearer ')
  ? authHeader.replace('Bearer ', '')
  : null;

  console.log('Received Token:', token); // Debugging
  console.log('Authorization Header:', req.header('Authorization'));

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Debugging
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    res.status(400).json({ error: 'Invalid token.' });
  }
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.message);
  if (err.status) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});