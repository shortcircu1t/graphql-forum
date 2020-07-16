import { NewPasswordSchema } from "../../../../utils/yupSchemas";
import User from "../../../models/User";
import argon2 from "argon2";

export const resolvers = {
  Mutation: {
    changePassword: async (
      _,
      { oldPassword, newPassword, newPasswordConfirm },
      { session: { user } }
    ) => {
      try {
        if (!user) {
          throw new Error("Unauthorized.");
        }
        await NewPasswordSchema.validate({
          oldPassword,
          newPassword,
          newPasswordConfirm,
        });
        const isRightPassword = await argon2.verify(user.password, oldPassword);
        if (!isRightPassword) {
          throw new Error("Password incorrect.");
        }
        const newPasswordHashed = await argon2.hash(newPassword);
        await User.update(
          { password: newPasswordHashed },
          { where: { id: user.id } }
        );
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
