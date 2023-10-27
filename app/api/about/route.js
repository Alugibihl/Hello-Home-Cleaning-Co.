import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function GET(request) {
    const session = await getServerSession(options);
    console.log("SESSION: ", session)
    return NextResponse.json({ message: request });
}
