import Link from "next/link";
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <nav>
      <ul className="footer">
        <li>
          <Link href="/">Home Page</Link>
        </li>
        <li>
          <Link href="/careers">Join Our Team</Link>
        </li>
        <li>
          <Link href="/signIn">Log In</Link>
        </li>
        <li>
          <Link href="/appointments/create">Request a quote</Link>
        </li>
        <li>
          <Link href="/meettheteam">Meet The Team</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Footer;
