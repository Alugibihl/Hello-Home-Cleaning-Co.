"use client";
import { data } from "autoprefixer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdPendingActions } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import AppointmentCard from "@/components/AppointmentCard/AppointmentCard";

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
    <div className="flex flex-col gap-5">
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment._id} appointment={appointment} />
      ))}
    </div>
  );
}
