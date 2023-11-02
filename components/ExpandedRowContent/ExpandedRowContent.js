import React from 'react';

const ExpandedRowContent = ({ appointment }) => {
  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Appointment Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <strong>Client Name:</strong> {appointment.name}
        </div>
        <div>
          <strong>Date:</strong> {appointment.date}
        </div>
        <div>
          <strong>Phone:</strong> {appointment.phone}
        </div>
        <div>
          <strong>Address:</strong> {appointment.address}
        </div>
        <div>
          <strong>Stories:</strong> {appointment.stories}
        </div>
        <div>
          <strong>Rooms:</strong> {appointment.rooms}
        </div>
        <div>
          <strong>Pets:</strong> {appointment.pets}
        </div>
        <div>
          <strong>No Touch Areas:</strong> {appointment.noTouch}
        </div>
        <div>
          <strong>Focus Areas:</strong> {appointment.focus}
        </div>
        <div>
          <strong>Allergies:</strong> {appointment.allergies ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Cleaning Frequency:</strong> {appointment.frequency}
        </div>
        <div>
          <strong>Referred By:</strong> {appointment.refSource}
        </div>
        <div>
          <strong>Status:</strong> {appointment.status}
        </div>
        <div>
          <strong>Paid:</strong> {appointment.paid ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Payment Method:</strong> {appointment.paymentMethod}
        </div>
        <div>
          <strong>Price:</strong> ${appointment.price}
        </div>
      </div>
    </div>
  );
}

export default ExpandedRowContent;
