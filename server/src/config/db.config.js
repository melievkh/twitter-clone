const { Pool } = require("pg");
const { DB } = require("../constants");
require("dotenv").config();

const pool = new Pool({
  user: DB.user,
  host: DB.host,
  database: DB.name,
  password: DB.password,
  port: DB.port,
});

async () => {
  await pool.connect();
};

module.exports = pool;
