import React, { useContext } from "react";
import { MeContext } from "../context/me";

export function useMe() {
  const { me } = useContext(MeContext);
  return { me };
}
