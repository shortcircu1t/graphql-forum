import React, { ReactElement, useState, useRef } from "react";
import Logo from "../Logo";
import Drawer from "./Drawer";
import Hamburger from "./Hamburger";
import useOutsideClick from "../../hooks/useOutsideClick";
import SearchBar from "./SearchBar";
import LinksBigScreen from "./LinksBigScreen";
import MobileNav from "./MobileNav";
import ProfilePicture from "../ProfilePicture";
import Settings from "./Settings";
import { useMe } from "../../hooks/useMe";

interface Props {
  activeLink?: string;
}

export default function Header({ activeLink }: Props): ReactElement {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const { me } = useMe();
  const settingsRef = useRef(null);
  const picRef = useRef<HTMLImageElement>(null);
  useOutsideClick(settingsRef, picRef, () => {
    setIsSettingsOpen(false);
  });
  return (
    <>
      <header>
        <div className="flex items-center justify-between w-full h-16 px-4 mx-auto mb-5 border-b-2 border-solid lg:px-12 lg:justify-center lg:h-20 border-black-light">
          <nav className="flex items-center w-full lg:justify-center ">
            <Logo />
            <LinksBigScreen activeLink={activeLink} />
            <SearchBar />
            {!me && (
              <button
                onClick={() => setIsAuthMenuOpen(true)}
                className="hidden px-6 py-1 ml-3 font-normal text-teal-400 border border-teal-400 border-solid rounded-full lg:block"
              >
                Sign In
              </button>
            )}
            {me && (
              <div className={"relative ml-3"}>
                <div
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  ref={picRef}
                >
                  <ProfilePicture src={me.avatarUrl} />
                </div>
                {isSettingsOpen && (
                  <div ref={settingsRef}>
                    <Settings />
                  </div>
                )}
              </div>
            )}
          </nav>
          <Hamburger
            toggled={isMobileNavOpen}
            toggle={() => setIsMobileNavOpen(!isMobileNavOpen)}
          />
        </div>
        <MobileNav
          isOpen={isMobileNavOpen}
          activeLink={activeLink}
          me={me}
          setIsAuthMenuOpen={setIsAuthMenuOpen}
        />
        <Drawer
          isOpen={isAuthMenuOpen}
          close={() => setIsAuthMenuOpen(false)}
          isRegisterForm={isRegisterForm}
          setIsRegisterForm={setIsRegisterForm}
        />
      </header>
      <style jsx global>{`
        body {
          ${isMobileNavOpen
            ? `
               overflow: hidden;
               `
            : ``}
        }
      `}</style>
    </>
  );
}
