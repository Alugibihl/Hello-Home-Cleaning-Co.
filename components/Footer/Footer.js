import Link from "next/link";
import React from "react";
import FooterLink from "./FooterLink";

const Footer = () => {
  return (
    <footer
      className="bg-500
             text-white
             text-center
             fixed
             inset-x-0
             bottom-0
             "
    >
      <ul className="flex gap-1 justify-around bg-slate-900 p-2">
        <FooterLink label={"Home Page"} link={"/"} />
        <FooterLink label={"Join Our Team"} link={"/careers"} />
        <FooterLink label={"Log In"} link={"/signIn"} />
        <FooterLink label={"Request a Quote"} link={"/appointments/create"} />
        <FooterLink label={"Meet The Team"} link={"/team"} />
      </ul>
    </footer>
  );
};

export default Footer;
