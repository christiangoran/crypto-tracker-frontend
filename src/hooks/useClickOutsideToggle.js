import { useEffect, useRef, useState } from "react";

const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mouseup", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mouseup", checkIfClickedOutside);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;
