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
    <div className="font-sans">
      <div className="relative w-full overflow-hidden ">
        <img
          src="/cleaning1.jpg"
          className="object-cover max-h-screen"
          alt="cleaning"
        />
        <div className="absolute top-1/4 left-0 right-0 mx-auto text-center transform translate-y-10 translate-x-5">
          <h1 className="text-xl md:text-6xl font-bold text-white shadow-md">
            Let us leave your home sparkling clean.
          </h1>
          <button
            onClick={() => router.push("/appointments/create")}
            className="mt-8 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center bg-pastel-blue py-12 px-4 md:px-0">
        {[1, 2, 5].map((num) => (
          <div key={num} className="m-12 mt-5 max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
            
            <img
              src={`/cleaning${num}.jpg`}
              className="w-full h-64 object-cover"
              alt={`cleaning${num}`}
            />
            <div className="p-6">
              <p className="font-semibold text-lg leading-tight">
                Discover our all-natural cleaning approach.
              </p>
              <button
                onClick={() => router.push("/appointments/create")}
                className="mt-4 text-indigo-600 hover:text-indigo-700 transition duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}