import Appointment from "@/app/models/appointments";
import { connectMongoDB } from "@/libs/mongodb";
import { getServerSession } from "next-auth";
import { options } from "../../../../auth[...nextauth]/options"

JavaScript
// Get one review by ID
export async function GET(request, { params }) {
    const { user } = await getServerSession(options);
    const { id } = params;

    try {
        await connectMongoDB();
        const review = await Appointment.findById(id).select("review");

        if (!(user.role === "admin" || review.userId === user.id)) {
            return NextResponse.json({ message: "Unauthorized", status: 403 });
        }

        return NextResponse.json({ review });
    } catch (error) {
        return NextResponse.json({ error: "Failed to get review", status: 500 });
    }
}

// Delete a review by ID
export async function DELETE(request, { params }) {
    const { user } = await getServerSession(options);
    const { id } = params;

    try {
        await connectMongoDB();
        const review = await Appointment.findById(id).select("review");

        if (!(user.role === "admin" || review.userId === user.id)) {
            return NextResponse.json({ message: "Unauthorized", status: 403 });
        }

        await Appointment.findByIdAndDelete(id);

        return NextResponse.json({ message: "Review deleted successfully", status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete review", status: 500 });
    }
}

// Update a review by ID
export async function PUT(request, { params }) {
    const { user } = await getServerSession(options);
    const { id } = params;
    const { review } = await request.json();

    try {
        await connectMongoDB();
        const reviewToUpdate = await Appointment.findById(id).select("review");

        if (!(user.role === "admin" || reviewToUpdate.userId === user.id)) {
            return NextResponse.json({ message: "Unauthorized", status: 403 });
        }

        reviewToUpdate.review = review;
        await reviewToUpdate.save();

        return NextResponse.json({ message: "Review updated successfully", status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update review", status: 500 });
    }
}
