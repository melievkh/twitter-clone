const pool = require("./config/db.config");

const db = {
  initDatabase: async () => {
    try {
      // delete users table;
      // await pool.query(`DROP TABLE users CASCADE;`);
      await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
              id VARCHAR(200) PRIMARY KEY,
              username VARCHAR(60) NOT NULL,
              fullname VARCHAR(100) NOT NULL,
              email VARCHAR(80) NOT NULL,
              password VARCHAR(200) NOT NULL,
              created_at TIMESTAMPTZ DEFAULT NOW(),
              UNIQUE (email));
          `);
      // delete tweets table;
      // await pool.query(`DROP TABLE tweets;`);

      await pool.query(`
            CREATE TABLE IF NOT EXISTS tweets(
              id SERIAL PRIMARY KEY,
              caption TEXT NOT NULL,
              created_at TIMESTAMPTZ DEFAULT NOW(),
              updated_at TIMESTAMPTZ DEFAULT NOW(),
              user_id VARCHAR(200) REFERENCES users(id) NOT NULL
              );
          `);

      // delete chat_messages table;
      // await pool.query(`DROP TABLE chat_messages;`);

      await pool.query(`CREATE TABLE IF NOT EXISTS chat_messages (
            id SERIAL PRIMARY KEY,
            sender_id VARCHAR(200) REFERENCES users(id) NOT NULL,
            recipient_id VARCHAR(200) REFERENCES users(id) NOT NULL,
            message TEXT NOT NULL,
            timestamp TIMESTAMPTZ DEFAULT NOW()
            );
         `);
    } catch (error) {
      console.log(error);
    }
  },

  // users queries

  getUsers: async () => {
    const getUsersQuery = `SELECT * FROM users;`;
    const users = await pool.query(getUsersQuery);
    return users.rows;
  },

  getUserById: async (userId) => {
    const getUserByIdQuery = `SELECT * FROM users WHERE id = $1;`;
    const users = await pool.query(getUserByIdQuery, [userId]);
    return users.rows[0];
  },

  getUniqueUser: async (email, username) => {
    const getUniqueUserQuery = `SELECT * FROM users WHERE email = $1 AND username = $2;`;
    const result = await pool.query(getUniqueUserQuery, [email, username]);
    return result.rows[0];
  },

  getUserByEmail: async (email) => {
    const getUserByEmailQuery = `SELECT * FROM users WHERE email = $1;`;
    const result = await pool.query(getUserByEmailQuery, [email]);
    return result.rows[0];
  },

  registerUser: async (id, username, fullname, email, password) => {
    const insertUserQuery = `INSERT INTO users (id, username, fullname, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [id, username, fullname, email, password];
    const user = await pool.query(insertUserQuery, values);

    return user.rows[0];
  },

  // tweets queries

  getTweets: async () => {
    const getTweetQuery = `SELECT tweets.*, users.username, users.fullname FROM tweets JOIN users ON tweets.user_id = users.id;`;
    const tweets = await pool.query(getTweetQuery);
    return tweets.rows;
  },

  getTweetsByUserId: async (userId) => {
    const getTweetByIdQuery = `SELECT tweets.*, users.username, users.fullname from tweets JOIN users ON tweets.user_id = users.id WHERE user_id = $1;`;
    const tweets = await pool.query(getTweetByIdQuery, [userId]);
    return tweets.rows;
  },

  createTweet: async (caption, user_id) => {
    const insertTweetQuery = `INSERT INTO tweets (caption, user_id) VALUES ($1, $2) RETURNING *`;
    const values = [caption, user_id];
    const tweets = await pool.query(insertTweetQuery, values);
    return tweets.rows[0];
  },

  deleteTweet: async (id) => {
    const insertTweetQuery = `DELETE FROM tweets WHERE id = $1`;
    const values = [id];
    await pool.query(insertTweetQuery, values);
  },

  // get messages query

  getMessages: async (sender_id, recipient_id) => {
    const messages = await pool.query(
      "SELECT * FROM chat_messages WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1)",
      [sender_id, recipient_id],
    );

    return messages.rows;
  },
};

module.exports = db;
