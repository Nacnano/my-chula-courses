const { Pool } = require("pg");
var connection = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

async function createAlbumsTable() {
  try {
    const query = `
            CREATE TABLE IF NOT EXISTS albums (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                artist VARCHAR(255) NOT NULL,
                price NUMERIC(10, 2)
            );
        `;
    await connection.query(query);
    console.log("Albums table created");
  } catch (err) {
    console.error(err);
    console.error("Albums table creation failed");
  }
}

createAlbumsTable();
module.exports = connection;
