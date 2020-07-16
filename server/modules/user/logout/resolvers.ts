export const resolvers = {
  Mutation: {
    logout: async (_, __, { session }) => {
      try {
        if (session?.user?.id) {
          session.destroy((err) => {
            if (err) {
              console.log(err);
            }
          });
        }
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
