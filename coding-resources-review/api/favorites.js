const client = require('./db');

async function addFavorite({ userId, resourceId }) {
  try {
    const { rows: [favorite] } = await client.query(`
      INSERT INTO favorites(user_id, resource_id) 
      VALUES($1, $2) 
      RETURNING *;
    `, [userId, resourceId]);

    return favorite;
  } catch (error) {
    throw new Error(`Error adding favorite: ${error.message}`);
  }
}

async function removeFavorite({ userId, resourceId }) {
  try {
    const { rows: [favorite] } = await client.query(`
      DELETE FROM favorites WHERE user_id=$1 AND resource_id=$2 RETURNING *;
    `, [userId, resourceId]);

    if (!favorite) throw new Error('Favorite not found');
    return favorite;
  } catch (error) {
    throw new Error(`Error removing favorite: ${error.message}`);
  }
}

async function getFavoritesByUserId(userId) {
  try {
    const { rows } = await client.query('SELECT * FROM favorites WHERE user_id=$1;', [userId]);
    return rows;
  } catch (error) {
    throw new Error(`Error fetching favorites: ${error.message}`);
  }
}

module.exports = {
  addFavorite,
  removeFavorite,
  getFavoritesByUserId,
};