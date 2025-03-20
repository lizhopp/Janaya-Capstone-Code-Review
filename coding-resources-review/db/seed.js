const client = require("./db");

async function seedDatabase() {
  try {
    console.log("Starting to seed database...");

    // Clear existing data
    await client.query('TRUNCATE TABLE users, resources, reviews, favorites RESTART IDENTITY CASCADE;');
    console.log('Cleared existing data');
    // Insert users
    await client.query(`
      INSERT INTO users (username, email, password, isAdmin)
      VALUES
        ('admin', 'admin@gmail.com', 'admin123', TRUE),
        ('user1', 'user1@gmail.com', 'user123', FALSE),
        ('user2', 'user2@gmail.com', 'user123', FALSE);
    `);
    console.log('Inserted users');
    // Insert resources
    await client.query(`
      INSERT INTO resources (title, type, language, link, description, product_id)
      VALUES
        ('Introduction to JavaScript', 'video', 'JavaScript', 'https://example.com/js-intro', 'Learn the basics of JavaScript.', 1),
        ('Eloquent JavaScript', 'book', 'JavaScript', 'https://eloquentjavascript.net', 'A great book for learning JavaScript.', 2),
        ('React Tutorial', 'article', 'JavaScript', 'https://reactjs.org/tutorial', 'Official React tutorial.', 3);
    `);
    console.log('Inserted resources');
    // Insert reviews
    await client.query(`
      INSERT INTO reviews (user_id, resource_id, rating, comment)
      VALUES
        (2, 1, 5, 'Great video!'),
        (3, 2, 4, 'Very informative book.'),
        (2, 3, 5, 'Excellent tutorial.');
    `);
    console.log('Inserted reviews');


    // Insert favorites
    await client.query(`
      INSERT INTO favorites (user_id, resource_id)
      VALUES
        (2, 1),
        (3, 2),
        (2, 3);
    `);
    console.log('Inserted favorites');
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