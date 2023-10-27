// import Modal from "@/components/Modal/Modal"
// import React from "react"

async function getAbout() {
    const res = await fetch('http://localhost:3000/api/about');
    const { message } = await res.json();

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
    )
}
