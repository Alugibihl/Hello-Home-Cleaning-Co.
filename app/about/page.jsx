// import Modal from "@/components/Modal/Modal"
// import React from "react"
import axios from "axios";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

async function getAbout() {
    const session = await getServerSession(options);
    axios.defaults.headers.common[
      "Authorization"
    ] = `${JSON.stringify(session)}`;
  const res = await axios.get("http://localhost:3000/api/about");
  const { message } = await res.data;

  return message;
}
export default async function Page() {
  const message = await getAbout();

  return (
    <>
      <h1 className="bg-teal-600 text-blue-300">{message}</h1>
      {/* {console.log("----------------------------------------", React.version)} */}
      {/* <button onClick={() => Modal}>Modal test</button> */}
    </>
  );
}
