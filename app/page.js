'use client'
import { data } from "browserslist";
import { useSession } from "next-auth/react";
import { signIn, signOut } from 'next-auth/react'
import GoogleButton from "react-google-button";

export default function Home() {
  const session = useSession();
  console.log(session);
  const data = session.data;

  return (
    <div>
      <button onClick={() => signIn()}>Sign In</button>
      <button>Sign Up</button>
    </div>
  )

}
