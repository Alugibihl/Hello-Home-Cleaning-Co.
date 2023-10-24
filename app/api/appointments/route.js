import { connectMongoDB } from "@/lib/mongodb";
import Appointment from "@/app/models/appointments";
import { NextResponse } from "next/server";

export default async function POST(request) {
    try {
        await connectMongoDB();
        const newAppointment = new Appointment(request.body);
        const createdAppointment = await newAppointment.save();
        res.status(201).json(createdAppointment);
    } catch (error) {
        res.status(500).json({ error: "Appointment creation failed" });
    }
}


export async function GET(request) {
    try {
        await connectMongoDB();
        const appointments = await Appointment.findById(request.id);
        return NextResponse.json({ appointments, status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Appointment retrieval failed", status: 500 });
    }
}

export async function PUT(request) {
    try {
        await connectMongoDB();
        const { id, ...updateData } = request.body;
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, updateData, { new: true }).exec();
        return NextResponse.json({ updatedAppointment, status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Appointment update failed", status: 500 });
    }
}
