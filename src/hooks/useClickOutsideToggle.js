import { useEffect, useRef, useState } from "react";

const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      //Checks if ref is not null and if the clicked element is not
      //inside the ref element.
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
