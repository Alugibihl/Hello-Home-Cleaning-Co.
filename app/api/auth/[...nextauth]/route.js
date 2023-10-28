import NextAuth from "next-auth/next";

import { options } from "./options";

export const handler = NextAuth(options);

export { handler as GET, handler as POST }
