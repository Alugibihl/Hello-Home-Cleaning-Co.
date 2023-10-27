import Link from "next/link";
import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar">
        <li>
          <Link href="/">Home "should be the logo"</Link>
        </li>
        <li>
          <Link href="/about">Who we are</Link>
        </li>
        <li>
          <Link href="/appointments/create">Book Now</Link>
        </li>
        <li className="group relative">
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
        </li>
        <li>
          <Link href="/requestQuote">Request a Quote</Link>
        </li>
        <li>
          <Link href="/faq">FAQ</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
