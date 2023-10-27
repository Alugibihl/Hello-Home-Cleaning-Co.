'use client'
import Modal from "@/components/Modal/Modal"
export default function Page() {
    return (
        <>
            <h1 className="bg-teal-600 text-blue-300">ABOUT</h1>
            <button onClick={() => Modal}>Modal test</button>
        </>
    )
}
