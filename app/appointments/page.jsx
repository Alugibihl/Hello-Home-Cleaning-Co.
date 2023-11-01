"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

export default function Page() {
  const session = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [rows, setRows] = useState([]);

  // redirected if not logged in
  useEffect(() => {
    if (!session.data?.user) {
      router.push("/");
    }
  }, [session, router]);

  // if (!session?.data?.user) router.push("/");
  // console.log("SESSIONS DATA: ", session)
  // useEffect(() => {
  //   if (session.data.user.role === 'admin') {
  //     fetch("/api/appointments", { cache: "no-store" })
  //       .then((res) => res.json())
  //       .then((data) => setAppointments(data.appointments));
  //   } else {
  //     fetch(`/api/users/${session.data.user.id}/appointments`, { cache: "no-store" })
  //       .then((res) => res.json())
  //       .then((data) => setAppointments(data.appointments));
  //   }
  // }, [session]);

  // Fetch appointments
  useEffect(() => {
    if (session.data?.user) {
      const url = session.data.user.role === 'admin'
        ? "/api/appointments"
        : `/api/users/${session.data.user.id}/appointments`;

      fetch(url, { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => {
          setAppointments(data.appointments);
          console.log(data);
          console.log(data.appointments);
          const transformedRows = data.appointments.map((app, index) => ({
            id: index,
            date: app.date,
            phone: app.phone,
            status: app.status,
            name: app.name,
            refSource: app.refSource
            // ... any other fields you want to display
          }));
          setRows(transformedRows);
        });
    }
  }, [session]);

  // const GridRowsProp = [
  //   { id: 1, col1: 'Hello', col2: 'World' },
  //   { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  //   { id: 3, col1: 'MUI', col2: 'is Amazing' },
  // ];
  
  const columns = [
    { field: 'id', headerName: 'Client ID', flex: 1, minWidth: 100 },
    { field: 'name', headerName: 'Client', flex: 1, minWidth: 100 },
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 100 },
    { field: 'refSource', headerName: 'Referred By', flex: 1, minWidth: 100 },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 100 },
    { field: 'phone', headerName: 'Number', flex: 1, minWidth: 100 },
    // ... define other columns as needed
  ];
  

  return (

    <div style={{ height: 300, width: '100%' }}>
    <DataGrid rows={rows} columns={columns} />
    </div>

      /* {appointments.map((app) => (
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
      ))} */
     
  );
}
