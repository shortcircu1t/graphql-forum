import redis from "../../../redis";
import User from "../../../models/User";

export const resolvers = {
  Mutation: {
    confirmUser: async (_, { token }, {}) => {
      try {
        const result = await redis.get(token);
        if (!result) {
          throw new Error("Password reset token is invalid or has expired.");
        }
        await redis.del(token);
        await User.update({ confirmed: true }, { where: { id: result } });
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
