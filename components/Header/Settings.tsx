import React, { ReactElement } from "react";
import SettingsLink from "../Links/SettingsLink";
import { AnimatePresence, motion } from "framer-motion";

interface Props {}

export default function Settings({}: Props): ReactElement {
  return (
    <AnimatePresence>
      <motion.div
        className="absolute z-30 mt-1 -ml-12 rounded-lg lg:-ml-10"
        initial={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0 }}
      >
        <ul className="rounded-lg bg-black-light">
          <li className="p-1 text-xl lg:p-0">
            <SettingsLink href="/settings">Settings</SettingsLink>
          </li>
          <li className="p-1 text-xl lg:p-0">
            <SettingsLink href="/user/posts">Posts</SettingsLink>
          </li>
          <li className="p-1 text-xl lg:p-0">
            <SettingsLink href="/logout">Logout</SettingsLink>
          </li>
        </ul>
      </motion.div>
    </AnimatePresence>
  );
}
