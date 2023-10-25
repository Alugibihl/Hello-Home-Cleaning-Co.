import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { handler } from "../auth/[...nextauth]/route";

export async function GET(request) {
    const session = await getServerSession(handler);
    console.log("SESSION: ", session)
    return NextResponse.json({ message: request });
}
