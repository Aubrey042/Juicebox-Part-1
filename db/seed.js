const { client, getAllUsers } = require('./index');

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    const query = `
      DROP TABLE IF EXISTS users;
    `;
    console.log('Query:', query);

    await client.query(query);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    const query = `
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
      );
    `;
    console.log('Query:', query);

    await client.query(query);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    const users = await getAllUsers();
    console.log("getAllUsers:", users);

    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}


rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
