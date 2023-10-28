import Link from "next/link";
import React from "react";
// import "./Navbar.css";

const Navbar = ({ session }) => {
  console.log("NAV SESSION: ", session)
  return (
    <nav className="flex items-center justify-between">
      <Link href="/">
        <img src="hhlogo.png" className="w-56 m-6 ml-20"></img>
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
        <li className="mx-6">
          <Link href="/appointments/create">REQUEST QUOTE</Link>
        </li>
        <li className="mx-6">
          {!session ? <Link href="/signIn">LOGIN</Link> : <p>{session.user.name}</p>}
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
