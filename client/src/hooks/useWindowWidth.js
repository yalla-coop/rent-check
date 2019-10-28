// custom hook that lets you know if width is under tablet or not
// can be modified to include more options once we have more than one breakpoint

import { useState, useEffect } from "react";

// constants
import { sizeNum } from "../constants/breakpoints";

const useWindowWidth = () => {
  const isClient = typeof window === "object";
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  const { tablet } = sizeNum;
  return { isTablet: windowWidth < tablet };
};

export default useWindowWidth;
