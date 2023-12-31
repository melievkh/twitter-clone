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
    byUserId: (userId: string) => `/tweets/${userId}`,
    create: "/tweets/create",
    delete: (tweetId: string) => `/tweets/delete/${tweetId}`,
  },

  messages: {
    messages: (recepient_id: string) => `/messages/${recepient_id}`,
  },
};

export default endpoints;
