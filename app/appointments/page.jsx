'use client'
async function createAppointment({ name, date, phone }) {
  const res = await fetch("/api/appointments", {
    cache: "no-store",
  });
  if (res.ok) {
    const appointment = await res.json();
    return appointment;
  }
}
export default function Page() {

}
