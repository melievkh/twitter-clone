const pool = require("./config/db.config");

const db = {
  initDatabase: async () => {
    try {
      // await pool.query(`DROP TABLE users;`);
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

      // await pool.query(`DROP TABLE chat_messages;`);

      await pool.query(`CREATE TABLE IF NOT EXISTS chat_messages (
            id SERIAL PRIMARY KEY,
            sender_id VARCHAR(200) REFERENCES users(id) NOT NULL,
            recipient_id VARCHAR(200) REFERENCES users(id) NOT NULL,
            message TEXT NOT NULL,
            timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            );
         `);
    } catch (error) {
      console.log(error);
    }
  },

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

  getUserByEmail: async (email) => {
    const getUserByEmailQuery = `SELECT * FROM users WHERE email = $1;`;
    const users = await pool.query(getUserByEmailQuery, [email]);
    return users.rows[0];
  },

  registerUser: async (id, username, fullname, email, password) => {
    const insertUserQuery = `INSERT INTO users (id, username, fullname, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [id, username, fullname, email, password];
    const user = await pool.query(insertUserQuery, values);

    return user.rows[0];
  },

  // tweets

  getTweets: async () => {
    const getTweetQuery = `SELECT * FROM tweets;`;
    const tweets = await pool.query(getTweetQuery);
    return tweets.rows;
  },

  getTweetById: async (tweetId) => {
    const getTweetByIdQuery = `SELECT * FROM tweets WHERE id = $1;`;
    const tweets = await pool.query(getTweetByIdQuery, [tweetId]);
    return tweets.rows[0];
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

  // chat messages

  createMessage: async (senderId, recipientId, message) => {
    const messageValues = `INSERT INTO chat_messages (sender_id, recipient_id, message) VALUES ($1, $2, $3) RETURNING *`;
    const response = await pool.query(messageValues, [
      senderId,
      recipientId,
      message,
    ]);

    return response.rows[0];
  },

  getMessages: async () => {
    const messages = await pool.query(`SELECT * FROM chat_messages;`);

    return messages.rows;
  },

  getMessagesByUserId: async (userId) => {
    const result = await pool.query(
      `SELECT * FROM chat_messages WHERE sender_id = $1 OR recipient_id = $1`,
      [userId]
    );

    return result.rows;
  },
};

module.exports = db;
