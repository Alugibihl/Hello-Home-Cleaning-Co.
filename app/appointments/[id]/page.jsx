import RemoveBtn from "@/components/RemoveButton/RemoveButton";
import Link from "next/link";

async function fetchAppointmentById(id) {
  const res = await fetch(`http://localhost:3000/api/appointments/${id}`, {
    cache: "no-store",
  });
  if (res.ok) {
    const appointment = await res.json();
    return appointment;
  }
}
export default async function Page({ params }) {
  const { id } = params;
  const { appointment } = await fetchAppointmentById(id);



  console.log(appointment);

  return (
    <div>
      <h1>{appointment.name}</h1>
        <RemoveBtn id={id} />
    </div>
  );
}
