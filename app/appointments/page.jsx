"use client";
import React from 'react';
import { useTable, useFilters } from 'react-table';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ExpandedRowContent from '@/components/ExpandedRowContent/ExpandedRowContent';


export default function Page() {
  const session = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [expandedRowId, setExpandedRowId] = useState(null);

  const handleExpandClick = (rowId) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
  };

  const handleFilterChange = (e) => {
    setFilter('status', e.target.value); 
  };
  
  useEffect(() => {
    if (!session.data?.user) {
      router.push("/");
    }
  }, [session, router]);

  useEffect(() => {
    if (session.data?.user) {
      const url = session.data.user.role === 'admin'
        ? "/api/appointments"
        : `/api/users/${session.data.user.id}/appointments`;

      fetch(url, { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => setAppointments(data.appointments));
    }
  }, [session]);

  const columns = React.useMemo(
    () => [

      {
        Header: 'Status',  
        accessor: 'status',
        canSort: true,
        Cell: ({ value }) => {
          let bgColor;
          switch(value) {
            case 'New':
              bgColor = 'bg-red-500';
              break;
            case 'Scheduled':
              bgColor = 'bg-green-500';
              break;
            case 'Past':
              bgColor = 'bg-gray-700';
              break;
            default:
              bgColor = '';
              break;
          }
          return <div className={`p-2 ${bgColor} text-white rounded-lg`}>{value}</div>;
        }
      },
      {
        Header: '', 
        id: 'expander', 
        Cell: ({ row }) => (
          <div className="flex items-center justify-center">
              <button
              type="button"
              className="text-gray-500 text-2xl focus:outline-none"
              onClick={() => handleExpandClick(row.id)}
              >
                  {expandedRowId === row.id ? '-' : '+'}
              </button>
          </div>
        ),
      },
      // { Header: 'Client ID', accessor: 'id' },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Client', accessor: 'name' },
      // { Header: 'Status', accessor: 'status' },
      { Header: 'Number', accessor: 'phone' },
      { Header: 'Referred By', accessor: 'refSource' },
    ],
    [expandedRowId] 
  );

  const data = React.useMemo(
    () => appointments.map((app, index) => ({
      id: index,
      date: app.date,
      phone: app.phone,
      status: app.status,
      name: app.name,
      refSource: app.refSource,
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
    state: { expanded }
  } = useTable({
    columns,
    data,
    initialState: { expanded: {} }
  },
    useFilters
  );

  return (
            <div className="w-full">
              <select onChange={handleFilterChange} 
                className="w-40 h-12 ml-10 mb-6 p-2 text-lg bg-gray-200 border border-gray-300 rounded-lg shadow-sm appearance-none hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >      
                <option value="">All</option>
                <option value="new">New</option>
                <option value="past">Past</option>
                <option value="scheduled">Scheduled</option>
              </select>
            <table {...getTableProps()}className="w-full max-h-screen overflow-auto">
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()} className="font-bold text-sm border-b border-gray-300 p-2">
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row);
                  return (
                    <React.Fragment key={row.id}>
                      <tr {...row.getRowProps()} className="hover:bg-gray-100">
                        {row.cells.map(cell => (
                          <td {...cell.getCellProps()}  className="border border-gray-300 p-1">{cell.render('Cell')}</td>
                        ))}
                      </tr>
                      {expandedRowId === row.id && (
                        <tr>
                          <td colSpan={columns.length + 1} className="border border-gray-300 p-2">
                            <ExpandedRowContent appointment={row.original} />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          
  );
}
