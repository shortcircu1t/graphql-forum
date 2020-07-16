export const resolvers = {
  Query: {
    me: async (_, __, { session }) => {
      try {
        if (session.user) {
          return session.user;
        }
        throw new Error("No user");
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
