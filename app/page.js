"use client";
import { data } from "browserslist";
import { useSession } from "next-auth/react";
import { signIn, signOut, useRegistration } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleButton from "react-google-button";


export default function Home() {
  const session = useSession();
  const router = useRouter();
  console.log(session);
  const data = session.data;

  return (
    <div>
      <div className="relative w-full">
        <img src="/cleaning1.jpg" className="h-auto max-w-full"></img>
        <div className="absolute top-1/3 left-0 right-0 mx-auto text-center">
          <p className="text-5xl text-white">
            Let us leave your home sparkling clean.
          </p>
          <button
            onClick={() => {
              router.push("/appointments/create");
            }}
            className="mt-6 bg-feather-blue hover:bg-highlight-orange font-bold py-2 px-4 rounded"
          >
            Book Now
          </button>
        </div>
      </div>
      <div className="flex w-full justify-center bg-light-blue pb-32">
        <div className="w-1/5 m-6 bg-white pb-8">
          <img src="/cleaning2.jpg" className="h-auto max-w-full"></img>
          <p className="m-6 mx-8 font-bold h-10 leading-4">
            We use non toxic cleaners safe for humans, pets, and children. Great
            for the environment!
          </p>
          <button
            onClick={() => {
              router.push("/appointments/create");
            }}
            className="font-bold text-logo-blue ml-8 hover:text-highlight-orange"
          >
            Sign Up Today
          </button>
        </div>
        <div className="w-1/5 m-6 bg-white">
          <img src="/cleaning3.jpg" className="h-auto max-w-full"></img>
          <p className="m-6 mx-8 font-bold h-10 leading-4">
            We will clean and organize your home too!
          </p>
          <button
            onClick={() => {
              router.push("/appointments/create");
            }}
            className="font-bold text-logo-blue ml-8 hover:text-highlight-orange"
          >
            Let Us Help
          </button>
        </div>
        <div className="w-1/5 m-6 bg-white">
          <img src="/cleaning5.jpg" className="h-auto max-w-full"></img>
          <p className="m-6 mx-8 font-bold h-10 leading-4">
            We are up for any task and any occasion!
          </p>
          <button
            onClick={() => {
              router.push("/appointments/create");
            }}
            className="font-bold text-logo-blue ml-8 hover:text-highlight-orange"
          >
            Book Us For Your Next Party
          </button>
        </div>
      </div>
    </div>
  );
}
