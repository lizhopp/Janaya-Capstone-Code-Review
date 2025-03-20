const client = require('./db');

async function createResource({ title, type, language, link, description }) {
  try {
    const { rows: [resource] } = await client.query(`
      INSERT INTO resources(title, type, language, link, description) 
      VALUES($1, $2, $3, $4, $5) 
      RETURNING *;
    `, [title, type, language, link, description]);

    return resource;
  } catch (error) {
    throw new Error(`Error creating resource: ${error.message}`);
  }
}

async function updateResource(resourceId, fields = {}) {
  const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
  if (!setString.length) throw new Error('No fields to update');

  try {
    const { rows: [resource] } = await client.query(`
      UPDATE resources
      SET ${setString}
      WHERE id=${resourceId}
      RETURNING *;
    `, Object.values(fields));

    return resource;
  } catch (error) {
    throw new Error(`Error updating resource: ${error.message}`);
  }
}

async function getAllResources() {
  try {
    const { rows } = await client.query('SELECT * FROM resources;');
    return rows;
  } catch (error) {
    throw new Error(`Error fetching resources: ${error.message}`);
  }
}

async function getResourceById(resourceId) {
  try {
    const { rows: [resource] } = await client.query('SELECT * FROM resources WHERE id=$1;', [resourceId]);
    if (!resource) throw new Error('Resource not found');
    return resource;
  } catch (error) {
    throw new Error(`Error fetching resource: ${error.message}`);
  }
}

async function deleteResource(resourceId) {
  try {
    const { rows: [resource] } = await client.query('DELETE FROM resources WHERE id=$1 RETURNING *;', [resourceId]);
    if (!resource) throw new Error('Resource not found');
    return resource;
  } catch (error) {
    throw new Error(`Error deleting resource: ${error.message}`);
  }
}

module.exports = {
  createResource,
  updateResource,
  getAllResources,
  getResourceById,
  deleteResource,
};

