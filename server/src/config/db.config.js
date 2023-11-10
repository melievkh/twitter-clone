const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "twit_server",
  password: "21222324",
  port: 5432,
});

async () => {
  await pool.connect();
};

module.exports = pool;
