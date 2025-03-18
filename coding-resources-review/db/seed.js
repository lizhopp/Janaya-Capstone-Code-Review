const client = require("./db");

async function seedDatabase() {
  try {
    console.log("Starting to seed database...");

    // Insert users
    await client.query(`
      INSERT INTO users (username, email, password, isAdmin)
      VALUES
        ('admin', 'admin@gmail.com', 'admin123', TRUE),
        ('testuser', 'testuser@gmail.com', 'testuser123', FALSE),
        ('guestuser', 'guestuser@gmail.com', 'guestuser123', FALSE),
        ('user1', 'user1@gmail.com', 'user123', FALSE),
        ('user2', 'user2@gmail.com', 'user123', FALSE);
    `);

    // Insert resources
    await client.query(`
      INSERT INTO resources (title, type, language, link, description)
      VALUES
        ('Introduction to JavaScript', 'video', 'JavaScript', 'https://example.com/js-intro', 'Learn the basics of JavaScript.'),
        ('Eloquent JavaScript', 'book', 'JavaScript', 'https://eloquentjavascript.net', 'A great book for learning JavaScript.'),
        ('React Tutorial', 'article', 'JavaScript', 'https://reactjs.org/tutorial', 'Official React tutorial.');
    `);

    // Insert reviews
    await client.query(`
      INSERT INTO reviews (user_id, resource_id, rating, comment)
      VALUES
        (2, 1, 5, 'Great video!'),
        (3, 2, 4, 'Very informative book.'),
        (2, 3, 5, 'Excellent tutorial.');
    `);

    // Insert favorites
    await client.query(`
      INSERT INTO favorites (user_id, resource_id)
      VALUES
        (2, 1),
        (3, 2),
        (2, 3);
    `);

    console.log("Finished seeding database!");
  } catch (error) {
    console.error("Error seeding database:", error.message);
    throw error;
  }
}

// Run the function to seed the database
seedDatabase()
  .catch(console.error)
  .finally(() => client.end());
