'use client'
import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({children, session}) => {
    console.log("Session Provider: ", session)
    return <SessionProvider>{children}</SessionProvider>
}
