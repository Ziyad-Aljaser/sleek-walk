import { useRef } from "react";

const useSmoothScroll = (offset = 80) => {
  const targetRef = useRef(null);

  const scrollToTarget = () => {
    if (targetRef.current) {
      const targetTop = targetRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: targetTop - offset,
        behavior: "smooth",
      });
    }
  };

  return [targetRef, scrollToTarget];
};

export default useSmoothScroll;
