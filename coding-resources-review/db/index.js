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
    const { title, type, language, link, description } = req.body;
    const result = await client.query(
      "INSERT INTO resources (title, type, language, link, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, type, language, link, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating resource:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

