import Link from "next/link";

async function fetchAppointments() {
  const res = await fetch("http://localhost:3000/api/appointments", {
    cache: "no-store",
  });
  if (res.ok) {
    const appointments = await res.json();
    return appointments;
  }
}
export default async function Page() {
  const { appointments } = await fetchAppointments();



  return (
    <div>
      {appointments.map((app) => (
        <Link key={app._id} href={`/appointments/${app._id}`}>
          <h1>
            {app.name} - {app._id}
          </h1>
        </Link>
      ))}
    </div>
  );
}
