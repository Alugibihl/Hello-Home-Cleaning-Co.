"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

async function createAppointment({ name, date, phone, userId }) {
  console.log("CREATE APPT: ", userId);
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
  const router = useRouter();
  console.log(userId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointment = await createAppointment({ name, date, phone, userId });
    console.log(appointment);
    router.push("/appointments");
  };

  return (
    <form onSubmit={handleSubmit} classNameName="w-full max-w-lg ml-6">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block text-gray-700 text-s font-bold mb-2"
            for="grid-name"
          >
            Name
          </label>
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            classNameName="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block text-gray-700 text-s font-bold mb-2"
            for="grid-date"
          >
            Date
          </label>
          <input
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
            classNameName="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block text-gray-700 text-s font-bold mb-2"
            for="grid-phone"
          >
            Phone Number
          </label>
          <input
            value={phone}
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            classNameName="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <button classNameName="mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Create Appointment
      </button>
    </form>
  );
}
