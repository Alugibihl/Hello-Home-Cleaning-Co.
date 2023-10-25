'use client'
import GoogleButton from "react-google-button";
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const session = useSession();
  const router = useRouter();

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      email,
      password
    }
    signIn('credentials', data);
  }
  if (session.status === 'authenticated') router.push('/');
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@email.com"
        type="text"
        className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
        className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      />
      <button>Submit</button>
    </form>
  );
}
