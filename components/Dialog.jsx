import React from "react";
import { useEffect, useRef, useState } from "react";

export default function Dialog({ component, closeModal, children }) {
  const [isOpen, setIsOpen] = useState(true);

  const modalRef = useRef();
  useEffect(() => {
    const closeMenu = (e) => {
      if (!modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.createEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return <dialog open={isOpen}>{component}</dialog>;
}
