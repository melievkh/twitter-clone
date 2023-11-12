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

      await pool.query(`CREATE TABLE IF NOT EXISTS conversation (
            id BIGSERIAL PRIMARY KEY,
            sender_id VARCHAR(200) REFERENCES users(id) NOT NULL,
            recipient_id VARCHAR(200) REFERENCES users(id) NOT NULL,
            message TEXT NOT NULL,
            timestamp TIMESTAMPTZ DEFAULT NOW()
            );
         `);

      // delete user_follow table
      // await pool.query(`DROP TABLE follow;`);

      await pool.query(`CREATE TABLE IF NOT EXISTS follow (
          id SERIAL PRIMARY KEY,
          follower_id VARCHAR(200) REFERENCES users(id) NOT NULL,
          following_id VARCHAR(200) REFERENCES users(id) NOT NULL,
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
    const user = await pool.query(insertUserQuery, [
      id,
      username,
      fullname,
      email,
      password,
    ]);

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
    const tweets = await pool.query(insertTweetQuery, [caption, user_id]);
    return tweets.rows[0];
  },

  deleteTweet: async (id) => {
    const insertTweetQuery = `DELETE FROM tweets WHERE id = $1`;
    await pool.query(insertTweetQuery, [id]);
  },

  // get messages query

  getMessages: async (sender_id, recipient_id) => {
    const messageQuery = `SELECT * FROM conversation WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1)`;
    const messages = await pool.query(messageQuery, [sender_id, recipient_id]);
    return messages.rows;
  },

  // user follow queries

  createFollowRequest: async (follower_id, following_id) => {
    const createFollowWuery = `INSERT INTO follow (follower_id, following_id) VALUES ($1, $2)`;
    const message = await pool.query(createFollowWuery, [
      follower_id,
      following_id,
    ]);
    return message.rows[0];
  },

  getFollowers: async (userId) => {
    const getFollowersQuery = `SELECT * FROM follow WHERE following_id = $1`;
    const messages = await pool.query(getFollowersQuery, [userId]);
    return messages.rows;
  },

  getFollowings: async (userId) => {
    const getFollowingsQuery = `SELECT * FROM follow WHERE following_id = $1`;
    const messages = await pool.query(getFollowingsQuery, [userId]);
    return messages.rows;
  },
};

module.exports = db;
