"use client";
import RemoveBtn from "@/components/RemoveButton/RemoveButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "@/components/loading"


export default function Page({ params }) {
  const { id } = params;
  const [appointment, setAppointment] = useState();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    fetch(`/api/appointments/${id}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setAppointment(data.appointment))
      .then(() => setLoading(false));
  }, []);

  console.log("appointment: ", appointment);

  if (loading) return <h1>Loading</h1>;

  return (
    <div>
      <h1>{appointment.name}</h1>
      <p>{appointment.date}</p>
      <RemoveBtn id={id} />
    </div>
  );
}
