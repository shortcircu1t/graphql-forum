import React, { createContext } from "react";
import i18n from "../i18n";

export const TranslationContext = createContext({ t: i18n.en, lng: "" });

export function TranslationProvider({ t, lng, ...rest }) {
  return <TranslationContext.Provider value={{ t, lng }} {...rest} />;
}
