import React, { createContext } from "react";
import { User } from "../types/types";

interface Me {
  me: User;
}

export const MeContext = createContext<Partial<Me>>({});

export function MeProvider({ me, ...rest }) {
  return <MeContext.Provider value={{ me }} {...rest} />;
}
