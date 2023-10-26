'use client'
import RequestQuoteForm from "@/components/RequestQuoteForm/RequestForm"
import { useSession } from "next-auth/react"

export default function RequestPage() {
    const validSession = useSession()
    console.log("here", validSession)
    return (
        <RequestQuoteForm />
    )
};
