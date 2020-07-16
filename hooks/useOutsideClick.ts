import React, { useEffect } from "react";

export default function useOutsideClick(
  animatedElementRef,
  triggerElementRef,
  fn
) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        animatedElementRef.current &&
        !animatedElementRef.current.contains(event.target) &&
        event.target.parentElement !== triggerElementRef.current
      ) {
        fn();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [animatedElementRef, triggerElementRef, fn]);
}
