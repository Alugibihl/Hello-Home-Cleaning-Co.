import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import SessionProvider from "./SessionProivder";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { EdgeStoreProvider } from "@/libs/edgestore";

const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: "Hello Home Cleaning Co.",
  description: "Hello Home Cleaning",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(options);
  return (
    <html lang="en" className={'${inter.className} ${roboto.className}'}>
      <SessionProvider session={session}>
        <EdgeStoreProvider>
          <body>
            <Head>
              <link rel="icon" href="/favicon.ico" />
              <title>{metadata.title}</title>
            </Head>
            <Navbar session={session} />
            {children}
            {/* <Footer /> */}
          </body>
        </EdgeStoreProvider>

      </SessionProvider>
    </html>
  );
}
