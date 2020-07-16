import React, { ReactElement } from "react";
import LoginForm from "../Forms/LoginForm";
import RegisterForm from "../Forms/RegisterForm";
import DrawerMaterialUI from "@material-ui/core/Drawer";

interface Props {
  isOpen: boolean;
  close: () => void;
  isRegisterForm: boolean;
  setIsRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Drawer({
  isOpen,
  close,
  isRegisterForm,
  setIsRegisterForm,
}: Props): ReactElement {
  return (
    <DrawerMaterialUI anchor={"right"} open={isOpen} onClose={close}>
      <div className="h-full px-5 py-10 text-center text-white lg:px-10 bg-black-light">
        {!isRegisterForm && (
          <LoginForm openRegisterForm={() => setIsRegisterForm(true)} />
        )}

        {isRegisterForm && (
          <RegisterForm openLoginForm={() => setIsRegisterForm(false)} />
        )}
      </div>
    </DrawerMaterialUI>
  );
}
