'use client'
import GoogleButton from "react-google-button";
import { signIn, signOut } from 'next-auth/react'
export default function page() {
  return (
    <GoogleButton onClick={() => signIn('google')} />
  )
}
