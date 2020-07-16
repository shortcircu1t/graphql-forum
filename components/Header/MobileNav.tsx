import React, { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { uppercaseFirstChar } from "../../utils/uppercaseFirstChar";
import { CATEGORIES } from "../../config/constants";

interface Props {
  isOpen: boolean;
  activeLink?: string;
  me: any;
  setIsAuthMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileNav({
  isOpen,
  activeLink,
  me,
  setIsAuthMenuOpen,
}: Props): ReactElement {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="relative z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen -mt-20 bg-black-main lg:hidden">
            <nav>
              <ul>
                {CATEGORIES.map((category) => (
                  <li className="m-3 text-4xl text-center" key={category}>
                    <a
                      href={`/categories/${category}`}
                      className={`${
                        category === activeLink ? "text-teal-500" : "text-white"
                      }`}
                    >
                      {uppercaseFirstChar(category)}
                    </a>
                  </li>
                ))}
                {!me && (
                  <button
                    onClick={() => setIsAuthMenuOpen(true)}
                    className="block px-6 py-1 m-auto font-normal text-teal-400 border border-teal-400 border-solid rounded-full"
                  >
                    Sign In
                  </button>
                )}
              </ul>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
