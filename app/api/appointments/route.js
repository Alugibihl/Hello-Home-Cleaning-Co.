import { connectMongoDB } from "@/libs/mongodb";
import Appointment from "@/app/models/appointments";
import { NextResponse } from "next/server";



export async function POST(request) {
    try {
        const { name, date, phone } = await request.json()
        await connectMongoDB();
        await Appointment.create({ name, date, phone });
        return NextResponse.json({ message: "Appointment Created", status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Appointment creation failed", status: 500 });
    }
}


export async function GET(request) {
    try {
        await connectMongoDB();
        const appointments = await Appointment.find();
        return NextResponse.json({ appointments })
    } catch (error) {
        return NextResponse.json({ error: "Appointment retrieval failed", status: 500 });
    }
}
