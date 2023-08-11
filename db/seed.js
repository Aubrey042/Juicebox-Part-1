
const {
    client,
    getAllUsers,
    createUser,
    updateUsers, 
    
  } = require('./index');
  
  



// Drop Tables 
async function dropTables() {
  console.log(`Dropping Tables Please Wait.......`);
  try {
    await client.query(`
    DROP TABLE IF EXISTS users;
    `)
    console.log(`Drop Complete!`);
  } catch (error) {
    console.log(``);
    throw(error);
  }
}

// Create Tables 
async function createTables() {
  console.log(`Creating Tables Please Wait.......`);
  try {
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        name varchar(255) NOT NULL,
        location varchar(255) NOT NULL,
        active BOOLEAN DEFAULT true
      );
    `);
    console.log(`Table Creation Complete`);
  } catch (error) {
    console.log(`create error has occurred`);
    throw(error);
  }
}


// Create Users 
async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    await createUser({ username: 'albert', password: 'bertie99', name:'albert', location: 'Sidney, Australia' });
    await createUser({ username: 'sandra', password: '2sandy4me', name:'sandra',location: "Ain't tellin'",});
    await createUser({ username: 'glamgal', password: 'soglam', name:'glamgal', location: 'Upper East Side',  });

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

// Update users-------

// async function updateUser(id, fields = {}) {

//   // build the set string
//   const setString = Object.keys(fields).map(
//     (key, index) => `"${ key }"=$${ index + 1 }`
//   ).join(', ');

//   // return early if this is called without fields
//   if (setString.length === 0) {
//     return;
//   }

//   try {
//     const result = await client.query(`
//       UPDATE users
//       SET ${ setString }
//       WHERE id=${id}
//       RETURNING *;
//     `, Object.values(fields));

//     return result;
//   } catch (error) {
//     throw error;
//   }
// }




// Rebuild Table 
async function rebuildDB() { 
  console.log(`Checking Data, and connection Please Wait.......`);
  
  try {
    client.connect();

    console.log(`Data and Connection Verfied`);
    await dropTables();
    await createTables();
    await createInitialUsers();
    // await updateUsers();
    // console.log(``);
  } catch (error) {
    throw error
  } {
    
  }
}





// This function is only used to test our database
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



// Calling the rebuild function & then using the .then to call the DB test function.
rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());