"use client";
import { signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LoginModal from "../LoginModal/LoginModal";
import SignupModal from "../SignupModal/SignupModal";
import Modal from "../Modal/Modal";
// import "./Navbar.css";

const Navbar = ({ session }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const modalFunctions = {
    setShowLoginModal,
    setShowSignupModal,
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest("#user-menu-button") &&
        !event.target.closest("#user-menu-dropdown")
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      if (showDropdown) {
        document.removeEventListener("mousedown", handleOutsideClick);
      }
    };
  }, [showDropdown]);

  const appointmentsLink =
    session?.user.role === "admin" ? "/admin/appointments" : "/appointments";
  const appointmentsText =
    session?.user.role === "admin" ? "ALL APPOINTMENTS" : "MY APPOINTMENTS";

  return (
    <>
      <nav className="flex items-center justify-between shadow-md border-b-2 py-4 px-6 bg-white">
        <Link href="/" passHref>
          <Image
            src="/hhlogo.png"
            className="w-36 cursor-pointer"
            width={144}
            height={24}
            alt="Hello Home Cleaning Co. Logo"
          />
        </Link>
        <ul className="flex items-center font-roboto font-bold text-lg text-gray-700 space-x-10 lg:space-x-12 ">
          <li className="">
            <Link href="/">HOME</Link>
          </li>
          <li className="mx-6">
            <Link href="/about">ABOUT</Link>
          </li>
          <li className="mx-6">
            <Link href="/faq">FAQ</Link>
          </li>
          <li className="mx-6">
            <Link href="/team">MEET THE TEAM</Link>
          </li>
          {session?.user?.role !== "admin" && (
            <>
              <li className="mx-6">
                <Link href="/careers">JOIN OUR TEAM!</Link>
              </li>
              <li className="mx-6">
                <Link href="/appointments/create">MAKE AN APPOINTMENT</Link>
              </li>
            </>
          )}
          {session && (
            <li className="mx-6">
              <Link href={appointmentsLink}>{appointmentsText}</Link>
            </li>
          )}
        </ul>
        {session ? (
          <div className="relative">
            <button
              id="user-menu-button"
              className="bg-feather-blue hover:bg-highlight-orange focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center inline-flex items-center"
              aria-haspopup="true"
              aria-expanded={showDropdown ? "true" : "false"}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {session.user.name}
              <svg
                className="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {showDropdown && (
              <div
                id="user-menu-dropdown"
                className="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10"
              >
                <ul
                  className="py-2 text-sm text-gray-700"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {/* Include any other dropdown items here */}
                  <li>
                    <button
                      className="block px-4 py-2 text-md font-bold hover:bg-gray-100 w-full text-center"
                      onClick={() => {
                        signOut();
                        setShowDropdown(false);
                      }}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-feather-blue hover:bg-highlight-orange font-bold rounded text-sm px-5 py-2.5 text-center inline-flex items-center focus:outline-none focus:ring focus:border-blue-300"
          >
            Sign in
          </button>
        )}
        {showLoginModal && (
          <Modal
            component={LoginModal}
            close={() => setShowLoginModal(false)}
            modalFunctions={modalFunctions}
          />
        )}
        {showSignupModal && (
          <Modal
            component={SignupModal}
            close={() => setShowSignupModal(false)}
            modalFunctions={modalFunctions}
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;
