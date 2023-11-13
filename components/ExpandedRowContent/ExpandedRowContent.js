import React, { useState, useEffect } from "react";

const ExpandedRowContent = ({ appointment, updateAppointment, reverseFormatDate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState(appointment);

  useEffect(() => {
    setEditedAppointment(appointment);
  }, [appointment]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedAppointment(appointment);
  };

  const handleSaveClick = async (event) => {
    event.preventDefault();
    try {
      await updateAppointment(editedAppointment);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update appointment:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditedAppointment((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toDisplayKey = (key) => {
    if (key === "areaInterest") {
      return "Main Focus Areas";
    }
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Appointment Details</h3>
      <form onSubmit={handleSaveClick}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(editedAppointment).map(([key, value]) => {
            if (key === "id") return null;
            const displayKey = toDisplayKey(key);
  
            const InputComponent = ({ children }) => (
              <label key={key} className="flex flex-col space-y-2">
                <span className="text-gray-700 font-medium">{displayKey}:</span>
                {children}
              </label>
            );
  
            if (key === "status") {
              return (
                <InputComponent>
                  {isEditing ? (
                    <select
                      type="select"
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="New">New</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Past">Past</option>
                    </select>
                  ) : (
                    <span className="text-black">{value}</span>
                  )}
                </InputComponent>
              );
            } else if (key === "date") {
              const formattedDateForDisplay = reverseFormatDate(value);
              return (
                <InputComponent>
                  {isEditing ? (
                    <input
                      type="date"
                      name={key}
                      value={formattedDateForDisplay}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <span className="text-black">{value}</span>
                  )}
                </InputComponent>
              );
            } else if (typeof value === "boolean") {
              return (
                <InputComponent>
                  {isEditing ? (
                    <input
                      type="checkbox"
                      name={key}
                      checked={value}
                      onChange={handleChange}
                      className="rounded text-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <span>{value ? "Yes" : "No"}</span>
                  )}
                </InputComponent>
              );
            } else {
              return (
                <InputComponent>
                  {isEditing ? (
                    <input
                      type="text"
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <span className="text-black">{value}</span>
                  )}
                </InputComponent>
              );
            }
          })}
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleCancelClick}
                className="text-gray-600 bg-white border border-gray-300 font-semibold py-2 px-6 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Save
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleEditClick}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpandedRowContent;
