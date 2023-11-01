import bcrypt from "bcrypt";
import User from "@/app/models/user";
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse, userAgent } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function POST(request) {
    const body = await request.json();
    const {
        name,
        email,
        password,
        phone,
        address,
    } = body;

    console.log("REQUEST: ", body);

    const hashedPassword = await bcrypt.hash(password, 12);

    await connectMongoDB();
    const newUser = await User.create({
        email,
        name,
        phone,
        address,
        hashedPassword,
    })

    return NextResponse.json(newUser);
}


export async function GET(request) {
    const { user } = await getServerSession(options);

    if (!user || user.role !== "admin") return redirect("/");

    try {
        await connectMongoDB();
        const users = await User.find();
        return NextResponse.json({ users });
    } catch (error) {
        return NextResponse.json({
            error: "User retrieval failed",
            status: 500,
        });
    }
}
