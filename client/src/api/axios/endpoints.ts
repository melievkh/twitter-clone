const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh-token",
  },
  user: {
    users: "/users",
    userById: (userId: string) => `/users/${userId}`,
  },
  tweets: {
    tweets: "/tweets",
    tweetById: (tweetId: string) => `/tweets/${tweetId}`,
    create: "/tweets/create",
    delete: (tweetId: string) => `/tweets/delete/${tweetId}`,
  },

  messages: {
    messages: "/messages",
    create: "/messages/create",
    getByUser: (userId: string) => `/messages/${userId}`,
  },
};

export default endpoints;
