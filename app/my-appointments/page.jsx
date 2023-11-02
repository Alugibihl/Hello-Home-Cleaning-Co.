"use client";
import { data } from "autoprefixer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdPendingActions } from "react-icons/md";
import { FcApproval } from "react-icons/fc";

function getDay(string) {
  //   return string;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [year, month, day] = string.split("T")[0].split("-");
  return `${months[month - 1]} ${day}`;
}

export default function Page() {
  const session = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  if (!session.data?.user) {
    router.push("/");
  }

  useEffect(() => {
    fetch(`/api/users/${session.data.user.id}/appointments`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data.appointments);
        setIsLoading(false);
      });
  }, [session]);

  console.log(appointments);

  return (
    <div className="border-2 p-3 m-auto w-fit rounded-md">
      {appointments.map((appointment) => (
        <div key={appointment._id}>
          <span className="flex justify-between">
            <h2 className="font-roboto font-semibold text-xl text-slate-400 mb-2">
              New Appointment Requested: {appointment.name}
            </h2>
            {appointment.status === "New" ? (
              <MdPendingActions />
            ) : (
              <FcApproval />
            )}
          </span>
          {appointment.status === "New" ? (
            <div className="bg-slate-50 p-2 rounded-sm shadow-md mb-2">
              <p>
                <strong>Pending Approval:</strong> This request was submited on{" "}
                {getDay(appointment.createdAt)}. We will give you a call to
                confirm appointment details.
              </p>
              <button className="shadow-sm py-1 px-2 rounded-sm bg-white hover:shadow-md">
                Cancel This Appointment
              </button>
            </div>
          ) : (
            <div>
              <p>
                <strong>Appointment Confirmed:</strong> Your cleaning
                appointment is on {getDay(appointment.date)}. We look forward to
                helping you.
              </p>
            </div>
          )}
          <p>
            If you have any questions about your appointment, please call us at
            555-555-5555
          </p>
        </div>
      ))}
    </div>
  );
}
