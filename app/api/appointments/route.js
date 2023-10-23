import { connectMongoDB } from "@/lib/mongodb";
import Appointment from "@/app/models/appointments";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await connectMongoDB();
            const newAppointment = new Appointment(req.body);
            const createdAppointment = await newAppointment.save();
            res.status(201).json(createdAppointment);
        } catch (error) {
            res.status(500).json({ error: "Appointment creation failed" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}


export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await connectMongoDB();
            const appointments = await Appointment.find().exec();
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ error: "Appointment retrieval failed" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try {
            await connectMongoDB();
            const { _id, ...updateData } = req.body;
            const updatedAppointment = await Appointment.findByIdAndUpdate(_id, updateData, { new: true }).exec();
            res.status(200).json(updatedAppointment);
        } catch (error) {
            res.status(500).json({ error: "Appointment update failed" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
