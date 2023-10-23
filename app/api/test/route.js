import { AuthOptions } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req, res) {



    return NextResponse.json({message: "hello"})
}
