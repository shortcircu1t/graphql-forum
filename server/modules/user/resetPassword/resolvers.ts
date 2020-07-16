import User from "../../../models/User";
import createPasswordResetEmail from "../../../utils/createPasswordResetEmail";
import createPasswordResetUrl from "../../../utils/createPasswordResetUrl";
import sendEmail from "../../../utils/sendEmail";
import redis from "../../../redis";
import argon2 from "argon2";
import { ResetPasswordSchema } from "../../../../utils/yupSchemas";

export const resolvers = {
  Mutation: {
    sendPasswordEmail: async (_, { email }, { session }) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          throw new Error("No account with this email has been found.");
        }
        await user.update({ locked: true });
        if (session) {
          session.destroy();
        }
        const resetUrl = createPasswordResetUrl(user.id);
        const [html, text] = createPasswordResetEmail(resetUrl, user.email, 24);
        await sendEmail(email, text, html, "Reset your password.");
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
    resetPassword: async (_, { token, newPassword, newPasswordConfirm }) => {
      try {
        const userId = await redis.get(token);
        if (!userId) {
          throw new Error("Link is expired or wrong.");
        }
        await ResetPasswordSchema.validate({ newPassword, newPasswordConfirm });
        const hashedPassword = await argon2.hash(newPassword);
        const updatePromise = User.update(
          { password: hashedPassword, locked: false },
          { where: { id: userId } }
        );
        const deleteKeyPromise = redis.del(token);
        await Promise.all([updatePromise, deleteKeyPromise]);
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
