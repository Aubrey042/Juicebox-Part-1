const {Client} = require(`pg`);

const client = new Client('postgres://localhost:5433/juicebox');




async function createUser({ username, password }) {
  try {
    const result = await client.query(`
      INSERT INTO users(username, password)
      VALUES ($1, $2);
    `, [username, password]);

    return result;
  } catch (error) {
    throw error;
  }
}



async function getAllUsers() {
    const { rows } = await client.query(
      `SELECT id, username 
      FROM users;
    `);
  
    return rows;
  }





module.exports = {
    client,
    createUser,
    getAllUsers,
};


