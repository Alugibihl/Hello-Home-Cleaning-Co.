"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const session = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);

  if (!session?.data?.user) router.push("/");
  console.log("SESSIONS DATA: ", session)
  useEffect(() => {
    if (session.data.user.role === 'admin') {
      fetch("/api/appointments", { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => setAppointments(data.appointments));
    } else {
      fetch(`/api/users/${session.data.user.id}/appointments`, { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => setAppointments(data.appointments));
    }
  }, [session]);

  return (
    <div>
      {appointments.map((app) => (
        <div
          key={app._id}
          className="w-72 bg-white text-gray-700 border border-gray-200 rounded m-6"
        >
          <Link href={`/appointments/${app._id}`}>
            <h1>{app.name}</h1>
            <h2>{app.date}</h2>
            <h2>{app._id}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}
