import User from "../../../models/User";
import argon2 from "argon2";
import { LoginSchema } from "../../../../utils/yupSchemas";

export const resolvers = {
  Mutation: {
    login: async (_, { email, password }, { session, res }) => {
      try {
        await LoginSchema.validate({ email, password });
        const user = await User.findOne({
          where: { email },
        });
        if (!user) {
          throw new Error("Password or email incorrect.");
        }
        if (!user.confirmed) {
          throw new Error("Your account is unconfirmed.");
        }
        if (user.locked) {
          throw new Error("Account is locked.");
        }
        const isRightPassword = await argon2.verify(user.password, password);
        if (!isRightPassword) {
          throw new Error("Password or email incorrect.");
        }
        session.user = user.get({ plain: true });
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
