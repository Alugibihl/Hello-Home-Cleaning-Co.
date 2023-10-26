"use client";
import { data } from "browserslist";
import { useSession } from "next-auth/react";
import { signIn, signOut, useRegistration } from "next-auth/react";
import Link from "next/link";
import GoogleButton from "react-google-button";

export default function Home() {
  const session = useSession();
  console.log(session);
  const data = session.data;

  return session.status !== "authenticated" ? (
    <div>
      <button
        className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        onClick={() => signIn()}
      >
        Sign In
      </button>
      {/* <button
        className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        onClick={() => newUser()}
      >
        Sign Up
      </button> */}
      <Link
        className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        href={"/signUp"}
      >
        Sign Up
      </Link>
    </div>
  ) : (
    <div>
      <h1>{data.user.name}</h1>
      <button onClick={() => signOut()}>Log out</button>
    </div>
  );
}
