import { connectMongoDB } from "@/libs/mongodb";
import Appointment from "@/app/models/appointments";
import { NextResponse } from "next/server";



export async function POST(request) {
    try {
        const { name, date, phoneNum } = request.json()
        await connectMongoDB();
        await Appointment.create({ name, date, phoneNum });
        return NextResponse.json({ message: "Appointment Created", status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Appointment creation failed", status: 500 });
    }
}

export async function GET(request) {
    try {
        await connectMongoDB();
        const appointments = await Appointment.findById(request.id);
        return NextResponse.json({ appointments })
    } catch (error) {
        return NextResponse.json({ error: "Appointment retrieval failed", status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { newName: name, newDate: date, newPhoneNum: phoneNum } = await request.json()
        await connectMongoDB();
        await Appointment.findByIdAndUpdate(id, { name, date, phoneNum });
        return NextResponse.json({ message: "Appointment Successfully Updated", status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Appointment update failed", status: 500 });
    }
}
export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get("id")
        await connectMongoDB()
        await Appointment.findByIdAndDelete(id)
        return NextResponse.json({ message: "Appointment Deleted", status: 201 })
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to delete appointment", status: 500 })
    }
}
