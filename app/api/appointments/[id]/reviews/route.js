import Appointment from "@/app/models/appointments"
import { connectMongoDB } from "@/libs/mongodb"
import { getServerSession } from "next-auth"
import { options } from "../../../auth/[...nextauth]/options"
import { redirect } from "next/dist/server/api-utils"



export async function POST(request) {
    const { user } = await getServerSession(options)
    if (!user) return redirect("/");
    const { appointmentId, review } = await request.json();

    await connectMongoDB();
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
        return NextResponse.json({ error: "Appointment not found" });
    }

    appointment.review = review;
    await appointment.save();

    return NextResponse.json({ message: "Review added successfully" });
}

export async function GET(request) {
    const { user } = await getServerSession(options);

    if (!user || user.role !== "admin") return NextResponse.json({ error: "You must be an admin to view all reviews" });

    await connectMongoDB();
    const reviews = await Appointment.find({ review: { $ne: null } }).select("review");

    if (reviews) {
        return NextResponse.json({ reviews });
    }

    return NextResponse.json({ message: "No reviews found" });
}
