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
