const client = require('./db');

async function createReview({ userId, resourceId, rating, comment }) {
  try {
    const { rows: [review] } = await client.query(`
      INSERT INTO reviews(user_id, resource_id, rating, comment) 
      VALUES($1, $2, $3, $4) 
      RETURNING *;
    `, [userId, resourceId, rating, comment]);

    return review;
  } catch (error) {
    throw new Error(`Error creating review: ${error.message}`);
  }
}

async function getReviewsByResourceId(resourceId) {
  try {
    const { rows } = await client.query('SELECT * FROM reviews WHERE resource_id=$1;', [resourceId]);
    return rows;
  } catch (error) {
    throw new Error(`Error fetching reviews: ${error.message}`);
  }
}

module.exports = {
  createReview,
  getReviewsByResourceId,
};
