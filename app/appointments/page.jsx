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
        <h1 key={app._id}>{app.name} - {app._id}</h1>
      ))}
    </div>
  );
}
