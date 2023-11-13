"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useTable, useFilters } from "react-table";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import ExpandedRowContent from "@/components/ExpandedRowContent/ExpandedRowContent";

export default function Page() {
  const session = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [statusFilter, setStatusFilter] = useState(null);
  const [paymentFilter, setPaymentFilter] = useState(null);

  const [filteredAppointments, setFilteredAppointments] = useState([])


  // const [filteredAppointments, setFilteredAppointments] = useState(appointments);

  // const [loading, setLoading] = useState(true);

  if (session?.data?.user?.role !== 'admin') router.push('/')

  const handleExpandClick = (rowId) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
  };

  const handleFilterChange = (e) => {
    setFilter("status", e.target.value);
    // setStatusFilter(e.target.value); 
  };

   const handlePaymentFilterChange = (e) => {
    setFilter('paid', e.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (!session.data?.user) {
      router.push("/");
    }
  }, [session, router]);

  useEffect(() => {
    if (session.data?.user) {
      const url =
        session.data.user.role === "admin"
          ? "/api/appointments"
          : `/api/users/${session.data.user.id}/appointments`;

      fetch(url, { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => setAppointments(data.appointments));
    }
  }, []);

  const fetchAppointments = () => {
    const url = session.data.user.role === 'admin'
      ? "/api/appointments"
      : `/api/users/${session.data.user.id}/appointments`;

    fetch(url, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setAppointments(data.appointments));
  };

  useEffect(() => {
    if (session.data?.user) {
      fetchAppointments(); 
    }
  }, [session.data?.user]);

  const updateAppointment = async (id, data) => {
    const response = await fetch(`/api/appointments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(`Failed to update appointment: ${response.status}`);
    }
  };

  const handleUpdateAppointment = async (updatedAppointment) => {
    try {
      const updatedData = await updateAppointment(updatedAppointment.id, updatedAppointment);
      fetchAppointments();
      console.log('Appointment updated successfully', updatedData);
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
    const cleanedString = formattedString.replace(dayRegex, '$1');
    const date = new Date(cleanedString);
    date.setDate(date.getDate() + 1);    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
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
      { Header: 'Number', accessor: 'phone' },
      { Header: 'Address', accessor: 'address'},
      { Header: 'Referred By', accessor: 'refSource' },
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

  // const filteredAppointments = useMemo(() => {
  //   return searchText
  //     ? appointments.filter((appointment) =>
  //         appointment.name.toLowerCase().includes(searchText.toLowerCase())
  //       )
  //     : appointments;
  // }, [searchText, appointments]);


   const data = React.useMemo(() => {
    // Filter appointments based on search text. If searchText is empty, return all appointments.
    // The useMemo for data should consider both searchText and statusFilter
      // Start with all appointments
      let filtered = [...appointments];

      if (searchText ) {
        filtered = filtered.filter(appointment =>
          appointment.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }
  
      // First, filter by status if there is a status filter applied
      if (statusFilter) {
        filtered = filtered.filter(appointment => appointment.status === statusFilter);
      }

      if (paymentFilter) {
        filtered = filtered.filter(appointment => appointment.paid === paymentFilter);
      }

  
      // Finally, map the filtered appointments to the required format
      return filtered.map((app) => ({
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
        frequency: app.frequency
      }));
    }, [appointments, searchText, statusFilter, paymentFilter]); // Depend on appointments and searchText

    // Map the filtered appointments to the format expected by the table
 

  


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
          placeholder="Filter Status..."
          className="w-40 h-12 p-2 text-lg text-center bg-gray-200 border border-gray-300 rounded-lg shadow-sm appearance-none hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="">All</option>
          <option value="new">New</option>
          <option value="past">Past</option>
          <option value="scheduled">Scheduled</option>
        </select>
        <div className="flex-grow"></div>
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search clients..."
          className="w-60 h-12 p-2 text-lg text-center bg-gray-200 border border-gray-300 rounded-lg shadow-sm appearance-none hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <div className="flex-grow"></div>
        <select
          onChange={handlePaymentFilterChange}
          placeholder="Filter Payment..."
          className="w-40 h-12 p-2 text-lg text-center bg-gray-200 border border-gray-300 rounded-lg shadow-sm appearance-none hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="">All</option>
          <option value="true">Paid</option>
          <option value="false">Unpaid</option>
        </select>
      </div>
      {data.length === 0 ? (
      <p className="text-black-500 text-2xl text-center py-20">No Appointments Found</p>
    ) : (
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
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <React.Fragment key={row.id}>
                <tr {...row.getRowProps()} className="hover:bg-gray-100">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="border border-gray-300 p-2">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
                {expandedRowId === row.id && (
                  <tr>
                    <td colSpan={columns.length + 1} className="border border-gray-300 p-2">
                      <ExpandedRowContent appointment={row.original} updateAppointment={handleUpdateAppointment} reverseFormatDate={reverseFormatDate}/>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ); 
          })}
        </tbody>
      </table>
    )}
    </div>
  );
}
