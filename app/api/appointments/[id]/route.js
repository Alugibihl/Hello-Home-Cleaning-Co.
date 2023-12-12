import { connectMongoDB } from "@/libs/mongodb";
import Appointment from "@/app/models/appointments";
import { NextResponse } from "next/server";
import User from "@/app/models/user";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";

export async function GET(request, { params }) {
  const { user } = await getServerSession(options);
  const { id } = params;
  try {
    await connectMongoDB();
    const appointment = await Appointment.findById(id);
    if (!(user.role === "admin" || appointment.userId === user.id)) {
      return NextResponse.json({ message: "Unauthorized" });
    }
    return NextResponse.json({ appointment });
  } catch (error) {
    return NextResponse.json({
      error: "Appointment retrieval failed",
      status: 500,
    });
  }
}

export async function PUT(request, { params }) {
  const { user } = await getServerSession(options);
  const { id } = params;
  const appointment = await Appointment.findById(id);

  if (!appointment) {
    return NextResponse.json({
      error: "Appointment not found",
      status: 404,
    });
  }

  const roles = {
    admin: {
      fields: [
        "id",
        "name",
        "date",
        "phone",
        "address",
        "stories",
        "rooms",
        "pets",
        "paid",
        "price",
        "noTouch",
        "areaInterest",
        "allergies",
        "status",
        "frequency",
        "refSource",
      ],
    },
    user: {
      fields: [
        "name",
        "phone",
        "address",
        "stories",
        "rooms",
        "pets",
        "noTouch",
        "areaInterest",
        "allergies",
        "frequency",
        "refSource",
        "date",
      ],
    },
  };

  const allowedFields = roles[user.role].fields;
  const requestBody = await request.json();
  const requestedFields = Object.keys(requestBody);
  const invalidFields = requestedFields.filter(
    (field) => !allowedFields.includes(field)
  );

  if (invalidFields.length > 0) {
    return NextResponse.json({
      message: `You are not authorized to update the following fields: ${invalidFields.join(
        ", "
      )}`,
      status: 403,
    });
  }

  const reformatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/\D/g, "");
  };

  function reverseFormatDate(formattedString) {
    if (formattedString) {
      const dayRegex = /(\d+)(st|nd|rd|th)/;
      const cleanedString = formattedString.replace(dayRegex, "$1");

      const date = new Date(cleanedString);

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    }
  }

  if (requestBody.phone) {
    requestBody.phone = reformatPhoneNumber(requestBody.phone);
  }
  // if (requestBody.date) {
  //   console.log(requestBody.date)
  //   requestBody.date = reverseFormatDate(requestBody.date);
  //   console.log(requestBody.date)
  // }

  await connectMongoDB();

  const updatedFields = Object.fromEntries(
    requestedFields.map((field) => [field, requestBody[field]])
  );

  const app = await Appointment.findByIdAndUpdate(id, updatedFields, {
    new: true,
  });
  console.log("APPOINTMENT UPDATED: ", app);

  if (app) {
    return NextResponse.json(app);
  }
  return NextResponse.json({
    error: "Appointment update failed",
    status: 500,
  });
}

export async function DELETE(request, { params }) {
  try {
    const { user } = await getServerSession(options);
    const { id } = params;

    const appointment = await Appointment.findById(id);

    if (!(user.role === "admin" || appointment.userId === user.id)) {
      return NextResponse.json({ message: "Unauthorized", status: 403 });
    }
    await connectMongoDB();
    if (appointment.status !== "New" && user.role !== "admin")
      return NextResponse.json({
        message: "Appointment cannot be deleted at this point",
      });
    await Appointment.findByIdAndDelete(id);
    return NextResponse.json({ message: "Appointment Deleted", status: 201 });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to delete appointment",
      status: 500,
    });
  }
}
