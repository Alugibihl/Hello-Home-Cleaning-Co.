"use client";
import { MdPendingActions } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import Payment from "../Payment/Payment";
function getDay(string) {
  //   return string;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [year, month, day] = string.split("T")[0].split("-");
  return `${months[month - 1]} ${day}`;
}
export default function AppointmentCard({ appointment, handleDelete }) {
  const router = useRouter();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(appointment.paid);

  function handleUpdate(id) {
    router.push(`/appointments/${id}/edit`);
  }
  useEffect(() => {}, [isPaid]);
  function handlePayment(id) {}

  return (
    <div className="border-2 p-3 m-auto w-fit rounded-md max-w-3xl">
      {appointment.status === "New" ? (
        <div>
          <span className="flex justify-between">
            <h2 className="font-roboto font-semibold text-xl text-slate-400 mb-2">
              New Appointment Requested: {appointment.name}
            </h2>
            <MdPendingActions />
          </span>
          <div className="bg-slate-50 p-2 rounded-sm shadow-md mb-2">
            <p>
              <strong>Pending Approval:</strong> This request was submited on{" "}
              {getDay(appointment.createdAt)}. We will give you a call to
              confirm appointment details.
            </p>
            <div className="flex gap-3 mt-1">
              <button
                onClick={() => handleDelete(appointment._id)}
                className="shadow-sm py-1 px-2 rounded-sm bg-white hover:shadow-md"
              >
                Cancel This Appointment
              </button>
              <button
                onClick={() => handleUpdate(appointment._id)}
                className="shadow-sm py-1 px-2 rounded-sm bg-white hover:shadow-md"
              >
                Update This Appointment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <span className="flex justify-between">
            <h2 className="font-roboto font-semibold text-xl text-green-800 mb-2">
              Appointment Confirmed for: {appointment.name}
            </h2>
            <div className="flex gap-4 font-roboto font-semibold text-xl text-green-500 mb-2">
              <BsFillCalendarCheckFill size={25} />
              <h2 className="font-roboto font-semibold text-xl text-green-500 mb-2">
                {getDay(appointment.date)}
              </h2>
            </div>
            <h2 className="font-roboto font-semibold text-xl text-green-800 mb-2">
              Total Due: {isPaid ? "Paid" : `$${appointment.price.toFixed(2)}`}
            </h2>
            <FcApproval />
          </span>
          <div className="bg-slate-50 p-2 rounded-sm shadow-md mb-2">
            <p>
              <strong>Appointment Confirmed:</strong> Your cleaning appointment
              is on {getDay(appointment.date)}. We look forward to helping you!
            </p>
            <div className="flex gap-3 my-2">
              <button
                onClick={() => handleUpdate(appointment._id)}
                className="shadow-sm py-1 px-2 rounded-sm bg-white hover:shadow-md"
              >
                Update This Appointment
              </button>
              {!isPaid && (
                <button
                  onClick={() => setIsPaymentOpen(!isPaymentOpen)}
                  className="shadow-sm py-1 px-2 rounded-sm bg-white hover:shadow-md"
                >
                  Pay for this appointment
                </button>
              )}
            </div>
            {isPaymentOpen && !isPaid && (
              <Payment appointment={appointment} setIsPaid={setIsPaid} />
            )}
          </div>
        </div>
      )}
      <p>
        If you have any questions about your appointment, please call us at
        (419) 208-6265
      </p>
    </div>
  );
}
