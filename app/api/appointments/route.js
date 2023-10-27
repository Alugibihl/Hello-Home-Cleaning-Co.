import { connectMongoDB } from "@/libs/mongodb";
import Appointment from "@/app/models/appointments";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { AuthOptions } from "next-auth";


export async function POST(request) {
    // const data = await getServerSession(AuthOptions);
    console.group("helllllloooooooooooo woooooooorrrlllllllllllldddd")
    const headers = request.headers.get("authorization");
    console.group("helllllloooooooooooo woooooooorrrlllllllllllldddd22222222222", headers)
    const user = JSON.parse(headers);
    console.group("helllllloooooooooooo woooooooorrrlllllllllllldddd3333333333333333", user)
    // return NextResponse.json({ message: JSON.stringify(user) })
    console.log("user", user, "id", user.id)
    try {
        const { name, date, phone, address, stories, rooms, pets, noTouch, focus, allergies, frequency, refSource } = await request.json()
        await connectMongoDB();
        await Appointment.create({ name, date, phone, userId: user.id, address, stories, rooms, pets, noTouch, focus, allergies, frequency, refSource });
        return NextResponse.json({ message: "Appointment Created", status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Appointment creation failed", status: 500 });
    }
}


export async function GET(request) {
    const session = await getServerSession(options)
    console.log("----------session___________________________________________", session)
    try {
        await connectMongoDB();
        const appointments = await Appointment.find();
        return NextResponse.json({ appointments })
    } catch (error) {
        return NextResponse.json({ error: "Appointment retrieval failed", status: 500 });
    }
}
