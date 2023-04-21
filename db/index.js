
const { Client } = require('pg'); // imports the pg module


const client = new Client('postgres://localhost:5433/juicebox');

module.exports = {
  client,
}

// inside db/index.js

async function getAllUsers() {
    const { rows } = await client.query(
      `SELECT id, username 
      FROM users;
    `);
  
    return rows;
  }
  
  // and export them
  module.exports = {
    client,
    getAllUsers,
  }