const { Client } = require('pg');

// supply the db name and location of the database
const client = new Client('postgres://localhost:5433/juicebox');

async function getAllUsers() {
  const { rows } = await client.query(`
    SELECT id, username 
    FROM users;
  `);

  return rows;
}

async function createUser({ username, password }) {
   const result = await client.query(`
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, password]);

    return result;
  }


module.exports = {
  client,
  getAllUsers,
  createUser
};
