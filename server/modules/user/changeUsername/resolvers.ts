import { UsernameSchema } from "../../../../utils/yupSchemas";
import User from "../../../models/User";
import argon2 from "argon2";

export const resolvers = {
  Mutation: {
    changeUsername: async (_, { username }, { session: { user } }) => {
      try {
        if (!user) {
          throw new Error("Unauthorized.");
        }
        await UsernameSchema.validate({
          username,
        });
        const usernameExists = await User.findOne({ where: { username } });
        if (usernameExists) {
          throw new Error("Username taken.");
        }
        await User.update({ username }, { where: { id: user.id } });
        user.username = username;
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
