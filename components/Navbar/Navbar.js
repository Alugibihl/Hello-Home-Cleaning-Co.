"use client";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SignIn from "../AuthModals/SignIn";
import OpenModalButton from "../OpenModalButton";
// import "./Navbar.css";

const Navbar = ({ session }) => {
  console.log("NAV SESSION: ", session);
  return (
    <nav className="flex items-center justify-between">
      <Link href="/">
        <Image
          src="/hhlogo.png"
          className="w-56 m-6 ml-20"
          width={300}
          height={30}
          alt="Hello Home Cleaning Co. Logo"
        ></Image>
      </Link>
      <ul className="flex font-roboto font-bold text-base mr-12">
        <li className="mx-6">
          <Link href="/">HOME</Link>
        </li>
        <li className="mx-6">
          <Link href="/about">ABOUT</Link>
        </li>
        <li className="mx-6">
          <Link href="/faq">FAQ</Link>
        </li>
        {/* <li className="group relative">
          <div>Services</div>
          <ol className="nav-hover">
            <li>
              <Link href="/services">Our Services</Link>
            </li>
            <li>
              <Link href="preparation">Your first clean</Link>
            </li>
            <li>
              <Link href="/contact">Request a Quote</Link>
            </li>
          </ol>
        </li> */}
        {session && (
          <li className="mx-6">
            <Link href="/appointments/create">REQUEST QUOTE</Link>
          </li>
        )}
        {session && (
          <Link href="/appointments">
            {session?.user?.role === "admin"
              ? "ALL APPOINTMENTS"
              : "MY APPOINTMENTS"}
          </Link>
        )}
        <li className="mx-6">
          {!session ? (<OpenModalButton
            buttonText="Sign In"
            modalComponent={<SignIn />} />
          ) : (
            <div>
              <p>{session.user.name}</p>
              <p>{session.user.email}</p>
              <button onClick={signOut}>Sign Out</button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
