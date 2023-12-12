"use client";
import React from "react";
import { useTable, useFilters } from "react-table";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ExpandedRowContent from "@/components/ExpandedRowContent/ExpandedRowContent";

export default function Page() {
  const session = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [expandedRowId, setExpandedRowId] = useState(null);
  // const [loading, setLoading] = useState(true);

  if (session?.data?.user?.role !== "admin") router.push("/");

  const handleExpandClick = (rowId) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
  };

  const handleFilterChange = (e) => {
    setFilter("status", e.target.value);
  };

  const handlePaymentFilterChange = (e) => {
    console.log(e.target.value);
    setFilter("paid", e.target.value);
  };

  useEffect(() => {
    if (!session.data?.user) {
      router.push("/");
    }
  }, [session, router]);

  const fetchAppointments = () => {
    fetch("/api/appointments", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setAppointments(data.appointments));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateAppointment = async (id, data) => {
    const response = await fetch(`/api/appointments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(`Failed to update appointment: ${response.status}`);
    }
  };

  const handleUpdateAppointment = async (updatedAppointment) => {
    try {
      const updatedData = await updateAppointment(
        updatedAppointment.id,
        updatedAppointment
      );
      setAppointments((apps) =>
        apps.map((app) => {
          console.log(app, updatedData);
          if (app._id === updatedData._id) return updatedData;
          // else return app
          return app;
        })
      );
      // fetchAppointments();
      console.log("Appointment updated successfully", updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  function formatDate(dateString) {
    if (dateString) {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric" };
      let formattedDate = date.toLocaleDateString("en-US", options);

      const day = date.getDate();
      let suffix = "th";
      if (day % 10 === 1 && day !== 11) suffix = "st";
      else if (day % 10 === 2 && day !== 12) suffix = "nd";
      else if (day % 10 === 3 && day !== 13) suffix = "rd";

      return formattedDate.replace(/\d+/, `${day}${suffix}`);
    }
  }

  function formatNumber(phoneNumber) {
    const phoneString = phoneNumber.toString();
    const cleaned = ("" + phoneString).replace(/\D/g, "");

    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  }

  function reverseFormatDate(formattedString) {
    if (formattedString) {
      const dayRegex = /(\d+)(st|nd|rd|th)/;
      const cleanedString = formattedString.replace(dayRegex, "$1");
      const date = new Date(cleanedString);
      date.setDate(date.getDate() + 1);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Appointment Status",
        accessor: "status",
        canSort: true,
        Cell: ({ value }) => {
          let bgColor;
          switch (value) {
            case "New":
              bgColor = "bg-red-500";
              break;
            case "Scheduled":
              bgColor = "bg-green-500";
              break;
            case "Past":
              bgColor = "bg-gray-700";
              break;
            default:
              bgColor = "";
              break;
          }
          return (
            <div className={`p-2 ${bgColor} text-white rounded-lg`}>
              {value}
            </div>
          );
        },
      },
      {
        Header: "",
        id: "expander",
        Cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="text-gray-500 text-2xl focus:outline-none"
              onClick={() => handleExpandClick(row.id)}
            >
              {expandedRowId === row.id ? "-" : "+"}
            </button>
          </div>
        ),
      },
      // { Header: 'Client ID', accessor: 'id' },
      { Header: "Date", accessor: "date" },
      { Header: "Client", accessor: "name" },
      // { Header: 'Status', accessor: 'status' },
      { Header: "Number", accessor: "phone" },
      { Header: "Address", accessor: "address" },
      { Header: "Referred By", accessor: "refSource" },
      {
        Header: "Payment Status",
        accessor: "paid",
        canSort: true,
        Cell: ({ value }) => {
          let bgColor;
          switch (value.toString()) {
            case "false":
              bgColor = "bg-red-500";
              break;
            case "true":
              bgColor = "bg-green-500";
              break;
            default:
              bgColor = "";
              break;
          }
          return (
            <div className={`p-2 ${bgColor} text-white rounded-lg`}>
              {value ? "Paid" : "Unpaid"}
            </div>
          );
        },
      },
    ],
    [expandedRowId]
  );

  const data = React.useMemo(
    () =>
      appointments.map((app, index) => ({
        id: app._id,
        date: app.date,
        phone: formatNumber(app.phone),
        status: app.status,
        rooms: app.rooms,
        stories: app.stories,
        noTouch: app.noTouch,
        pets: app.pets,
        areaInterest: app.areaInterest,
        paid: app.paid,
        name: app.name,
        address: app.address,
        refSource: app.refSource,
        price: app.price,
        frequency: app.frequency,
      })),
    [appointments]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    state: { expanded },
  } = useTable(
    {
      columns,
      data,
      initialState: { expanded: {} },
    },
    useFilters
  );

  return (
    <div className="w-full pt-4 px-10">
      <div className="flex justify-between space-x-4 mb-4">
        <select
          onChange={handleFilterChange}
          className="w-40 h-12 p-2 text-lg text-center bg-gray-200 border border-gray-300 rounded-lg shadow-sm appearance-none hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="">All</option>
          <option value="new">New</option>
          <option value="past">Past</option>
          <option value="scheduled">Scheduled</option>
        </select>
        <div className="flex-grow"></div>
        <select
          onChange={handlePaymentFilterChange}
          className="w-40 h-12 p-2 text-lg text-center bg-gray-200 border border-gray-300 rounded-lg shadow-sm appearance-none hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="">All</option>
          <option value="true">Paid</option>
          <option value="false">Unpaid</option>
        </select>
      </div>
      <table {...getTableProps()} className="w-full max-h-screen overflow-auto">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps()}
                  className="font-bold text-sm border-b border-gray-300 p-2"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <>
                <tr
                  key={row.id}
                  {...row.getRowProps()}
                  className="hover:bg-gray-100"
                >
                  {row.cells.map((cell) => (
                    <td
                      key={cell.id}
                      {...cell.getCellProps()}
                      className="border border-gray-300 p-2"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
                {expandedRowId === row.id && (
                  <tr>
                    <td
                      colSpan={columns.length + 1}
                      className="border border-gray-300 p-2"
                    >
                      <ExpandedRowContent
                        appointment={row.original}
                        updateAppointment={handleUpdateAppointment}
                        reverseFormatDate={reverseFormatDate}
                      />
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
