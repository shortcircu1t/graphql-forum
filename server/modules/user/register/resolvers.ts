import sendEmail from "../../../utils/sendEmail";
import argon2 from "argon2";
import { v4 } from "uuid";
import User from "../../../models/User";
import { ValidationError } from "apollo-server-express";
import { RegisterSchema } from "../../../../utils/yupSchemas";
import createAccountConfirmationUrl from "../../../utils/createAccountConfirmationUrl";
import createAccountConfirmationEmail from "../../../utils/createAccountConfirmationEmail";

export const resolvers = {
  Query: {
    test: async () => {
      const results = await User.findAll();
      return results.map((user) => user.get({ plain: true }));
    },
  },
  Mutation: {
    register: async (_, { username, password, passwordConfirm, email }, {}) => {
      try {
        await RegisterSchema.validate({
          username,
          password,
          passwordConfirm,
          email,
        });
        const usernameExists = await User.findOne({
          where: { username },
        });
        if (usernameExists) {
          throw new ValidationError("Username taken.");
        }
        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
          throw new ValidationError("Email exists.");
        }
        if (password !== passwordConfirm) {
          throw new ValidationError("Passwords do not match.");
        }
        const hashedPassword = await argon2.hash(password);
        const userId = v4();
        const user = await User.create({
          id: userId,
          email,
          username,
          password: hashedPassword,
          confirmed: false,
        });
        const confirmationUrl = createAccountConfirmationUrl(userId);
        const [html, text] = createAccountConfirmationEmail(
          confirmationUrl,
          email,
          24
        );
        await sendEmail(email, text, html, "Confirm your account.");
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
    destroyAll: async () => {
      try {
        const users = await User.findAll();
        users.forEach(async (user) => await user.destroy());
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
