"use client";
import { useState } from "react";

async function createAppointment({ name, date, phone }) {
  const res = await fetch("/api/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, date, phone }),
    cache: "no-store",
  });
  if (res.ok) {
    const appointment = await res.json();
    return appointment;
  }
}

export default function Page() {
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [phone, setPhone] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointment = await createAppointment({ name, date, phone });
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
