import { v4 } from "uuid";
import {
  ONE_DAY_SECS,
  IS_PRODUCTION,
  PROD_ENDPOINT,
  DEV_ENDPOINT,
} from "../../config/constants";
import User from "../models/User";
import redis from "../redis";

export default (userId: string): string => {
  const token = v4();
  redis.set(`${token}`, userId, "ex", ONE_DAY_SECS, () => {
    setTimeout(async () => {
      const user = await User.findOne({ where: { id: userId } });
      if (!user?.locked) {
        user?.update({ locked: false });
      }
    }, ONE_DAY_SECS);
  });
  return IS_PRODUCTION
    ? `${PROD_ENDPOINT}/user/passwordReset/${token}`
    : `${DEV_ENDPOINT}/user/passwordReset/${token}`;
};
