import React, { useContext } from "react";
import { TranslationContext } from "../context/translation";

export function useTranslation() {
  const { t, lng } = useContext(TranslationContext);
  return { t, lng };
}
