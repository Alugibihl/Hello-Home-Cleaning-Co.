'use client'
import Modal from "@/components/Modal/Modal"
import React from "react"
export default function Page() {
    return (
        <>
            <h1 className="bg-teal-600 text-blue-300">ABOUT</h1>
            {console.log("----------------------------------------", React.version)}
            <button onClick={() => Modal}>Modal test</button>
        </>
    )
}
