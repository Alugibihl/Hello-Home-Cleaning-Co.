"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

async function createAppointment({ name, date, phone, userId }) {
    console.log("CREATE APPT: ", userId)
  const res = await fetch("/api/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, date, phone, userId }),
    cache: "no-store",
  });
  if (res.ok) {
    const appointment = await res.json();
    return appointment;
  }
}

export default function Page() {
  const session = useSession();
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [phone, setPhone] = useState();

  const userId = session.data?.user?.id;
  console.log(userId)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointment = await createAppointment({ name, date, phone, userId });
    console.log(appointment);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
        className="text-black"
      />
      <input
        value={date}
        type="date"
        onChange={(e) => setDate(e.target.value)}
        className="text-black"
      />
      <input
        value={phone}
        type="text"
        onChange={(e) => setPhone(e.target.value)}
        className="text-black"
      />
      <button>Create</button>
    </form>
  );
}
