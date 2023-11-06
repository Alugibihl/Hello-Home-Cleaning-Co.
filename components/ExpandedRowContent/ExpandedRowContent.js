import React, { useState, useEffect } from "react";

const ExpandedRowContent = ({ appointment, updateAppointment }) => {
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
    <div className="p-4 bg-white border border-gray-300 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Appointment Details</h3>
      <form onSubmit={handleSaveClick}>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(editedAppointment).map(([key, value]) => {
            if (key === "id") return null;
            const displayKey = toDisplayKey(key);
            if (key === "date") {
              return (
                <label key={key} className="flex flex-col space-y-1">
                  <span className="text-gray-700">{displayKey}:</span>
                  {isEditing ? (
                    <input
                      type="date"
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="border-2 border-gray-200 rounded px-2 py-1 text-black"
                    />
                  ) : (
                    <span>{value}</span>
                  )}
                </label>
              );
            }
            if (typeof value === "boolean") {
              return (
                <label key={key} className="flex items-center space-x-3">
                  <span className="text-gray-700">{displayKey}:</span>
                  {isEditing ? (
                    <input
                      type="checkbox"
                      name={key}
                      checked={value}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{value ? "Yes" : "No"}</span>
                  )}
                </label>
              );
            } else {
              return (
                <label key={key} className="flex flex-col space-y-1">
                  <span className="text-gray-700">{displayKey}:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="border-2 border-gray-200 rounded px-2 py-1 text-black"
                    />
                  ) : (
                    <span>{value}</span>
                  )}
                </label>
              );
            }
          })}
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleCancelClick}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleEditClick}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
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
