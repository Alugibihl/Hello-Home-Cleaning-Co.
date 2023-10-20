import GoogleProvider from "next-auth/providers/google";
export const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({user, account}) {
            console.log("User: ", user);
            console.log("Account: ", account);
            return user;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}
