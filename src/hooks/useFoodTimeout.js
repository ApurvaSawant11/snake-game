import { useEffect, useRef } from "react";

const useFoodTimeout = (callback, delay, food, mode = true) => {
  const timeoutRef = useRef();

  // Remember the latest callback.
  useEffect(() => {
    timeoutRef.current = callback;
  }, [callback]);

  // Set up the timeout.
  useEffect(() => {
    const tick = () => {
      timeoutRef.current();
    };
    if (mode && delay !== null) {
      let id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [mode, delay, food]);
};

export default useFoodTimeout;
