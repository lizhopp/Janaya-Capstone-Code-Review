const express = require("express");
const client = require("./db");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes for get all resources

app.get("/api/resources", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM resources");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching resources:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Routes to get single resource by ID
app.get("/api/resources/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query("SELECT * FROM resources WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching resource:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to create a new resource
app.post("/api/resources", async (req, res) => {
  try {
    const { title, type, language, link, description, product_id } = req.body;
    const result = await client.query(
      "INSERT INTO resources (title, type, language, link, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, type, language, link, description, product_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating resource:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to register a new user
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to log in a user
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Middleware to authenticate requests
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = user;
    next();
  });
}

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

