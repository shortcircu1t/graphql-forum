import { FileSchema } from "../../../../utils/yupSchemas";
import User from "../../../models/User";

export const resolvers = {
  Mutation: {
    changeAvatar: async (_, { avatarUrl }, { session: { user } }) => {
      try {
        if (!user) {
          throw new Error("Unauthorized.");
        }
        // check schema
        await User.update({ avatarUrl }, { where: { id: user.id } });
        user.avatarUrl = avatarUrl;
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
