"use client";
import { data } from "autoprefixer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdPendingActions } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import AppointmentCard from "@/components/AppointmentCard/AppointmentCard";
import Loading from "@/components/Loding";

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
    if (!session?.data) return;
    fetch(`/api/users/${session.data.user.id}/appointments`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data.appointments);
        setIsLoading(false);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [session]);

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const filteredApps = appointments.filter((app) => {
          console.log("appointments id", app._id, id);
          return app._id !== id;
        });
        console.log(filteredApps);
        setAppointments(filteredApps);
      }
    }
  };
  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col gap-5 mt-8">
      {appointments.length != 0 ? (
        appointments.map((appointment) => (
          <AppointmentCard
            key={appointment._id}
            appointment={appointment}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <div className="w-full h-screen flex justify-center">
          <p className="text-bold">No appointments</p>
        </div>
      )}
    </div>
  );
}
