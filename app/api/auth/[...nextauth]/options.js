import User from "@/app/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import { headers } from "@/next.config";
import GoogleProvider from "next-auth/providers/google";
import { Content } from "next/font/google";
export const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({user, account}) {
            if (account.provider === 'google') {
                const { name, email } = user;
                try {
                    await connectMongoDB();
                    const userExists = await User.findOne({ email });
                    if (!userExists) {
                        const res = await fetch('http://localhost:3000/api/users', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name,
                                email
                            })
                        });
                        if (res.ok) {
                            return user;
                        }
                    }
                    else console.log("USER EXISTS");
                } catch(error) {
                    console.log(error)
                }
            }
            return user;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}
