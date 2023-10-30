"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { getServerSession } from "next-auth";
import InputFeild from "@/components/FormComponents/InputField";

export default function Page() {
  const session = useSession();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [stories, setStories] = useState("");
  const [rooms, setRooms] = useState("");
  const [pets, setPets] = useState("");
  const [noTouch, setNoTouch] = useState("None");
  const [focus, setFocus] = useState("None");
  const [allergies, setAllergies] = useState(false);
  const [frequency, setFrequency] = useState("none");
  const [refSource, setRefSource] = useState("");

  const userId = session.data?.user?.id;
  const router = useRouter();
  console.log(userId);

  if (!session || !session.data?.user) router.push("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        date,
        phone,
        userId,
        address,
        stories,
        rooms,
        pets,
        noTouch,
        focus,
        allergies,
        frequency,
        refSource,
      }),
    });

    router.push("/appointments");
  };

  // router.push("/appointments");
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg ml-6">
      <InputFeild
        label="Full Name"
        type="text"
        value={name}
        setValue={setName}
      />
      <InputFeild label="Date" type="date" value={date} setValue={setDate} />
      <InputFeild
        label="Phone Number"
        type="text"
        value={phone}
        setValue={setPhone}
      />
      <InputFeild
        label="Address"
        type="text"
        value={address}
        setValue={setAddress}
      />
      <InputFeild
        label="How many stories does your home have?"
        type="text"
        value={stories}
        setValue={setStories}
      />
      <InputFeild
        label="How many bedrooms and bathrooms?"
        type="text"
        value={rooms}
        setValue={setRooms}
      />
      <InputFeild
        label="Do you have any Pets?"
        type="text"
        value={pets}
        setValue={setPets}
      />
      <InputFeild
        label="Any areas you would like us to avoid?"
        type="text"
        value={noTouch}
        setValue={setNoTouch}
      />
      <InputFeild
        label="Any areas you would like us to focus on?"
        type="text"
        value={focus}
        setValue={setFocus}
      />
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block text-gray-700 text-s font-bold mb-2"
            htmlFor="grid-allergies"
          >
            Any allergies to Clove, Cinnamon, or Orange?
          </label>
          <input
            type="checkbox"
            checked={allergies}
            onChange={(e) => setAllergies(e.target.checked)}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block text-gray-700 text-s font-bold mb-2"
            htmlFor="grid-frequency"
          >
            How frequently are you looking have cleanings?
          </label>
          <select
            id="frequency"
            name="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="2">Every 2 weeks</option>
            <option value="3">Every 3 weeks</option>
            <option value="4">Every 4 weeks</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <InputFeild
        label="Where did you hear about us?"
        type="text"
        value={refSource}
        setValue={setRefSource}
      />
      <button className="mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Create Appointment
      </button>
    </form>
  );
}

//   <div className="flex flex-wrap -mx-3 mb-6">
//     <div className="w-full px-3">
//       <label
//         className="block text-gray-700 text-s font-bold mb-2"
//         htmlFor="grid-refSource"
//       >
//         Where did you hear about us?
//       </label>
//       <input
//         value={refSource}
//         type="text"
//         onChange={(e) => setRefSource(e.target.value)}
//         className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//       />
//     </div>
//   </div>}
