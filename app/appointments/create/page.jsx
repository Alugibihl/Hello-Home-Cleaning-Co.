"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { getServerSession } from "next-auth";
// import { options } from "../../api/auth/[...nextauth]/options";

async function createAppointment({
  session,
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
}) {
  console.log("CREATE APPT: ", userId);
  axios.defaults.headers.common["Authorization"] = `${JSON.stringify(session)}`;
  console.log("THIS IS MY SESSION", session);
  const res = await axios.post("http://localhost:3000/api/appointments", {
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
  });
  if (res.ok) {
    const appointment = await res.json();
    return appointment;
  }
}

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("session", session);
    const appointment = await createAppointment({
      session: session.data.user,
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
    });

    console.log(appointment);
    router.push("/appointments");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg ml-6">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block text-gray-700 text-s font-bold mb-2"
            htmlFor="grid-name"
          >
            Full Name
          </label>
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block text-gray-700 text-s font-bold mb-2"
            htmlFor="grid-date"
          >
            Date
          </label>
          <input
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block text-gray-700 text-s font-bold mb-2"
            htmlFor="grid-phone"
          >
            Phone Number
          </label>
          <input
            value={phone}
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block text-gray-700 text-s font-bold mb-2"
            htmlFor="grid-address"
          >
            Address
          </label>
          <input
            value={address}
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block text-gray-700 text-s font-bold mb-2"
            htmlFor="grid-stories"
          >
            How many stories does your home have?
          </label>
          <input
            value={stories}
            type="text"
            onChange={(e) => setStories(e.target.value)}
            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block text-gray-700 text-s font-bold mb-2"
            htmlFor="grid-rooms"
          >
            How many bedrooms and bathrooms?
          </label>
          <input
            value={rooms}
            type="text"
            onChange={(e) => setRooms(e.target.value)}
            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block text-gray-700 text-s font-bold mb-2"
            htmlFor="grid-pets"
          >
            Do you have any Pets? If so are they going to be put away during the
            appointment?
          </label>
          <input
            value={pets}
            type="text"
            onChange={(e) => setPets(e.target.value)}
            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block text-gray-700 text-s font-bold mb-2"
            htmlFor="grid-noTouch"
          >
            Any area you would like us to avoid?
          </label>
          <input
            value={noTouch}
            type="text"
            onChange={(e) => setNoTouch(e.target.value)}
            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block text-gray-700 text-s font-bold mb-2"
            htmlFor="grid-focus"
          >
            Any areas you would like us to focus on?
          </label>
          <input
            value={focus}
            type="text"
            onChange={(e) => setFocus(e.target.value)}
            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
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
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block text-gray-700 text-s font-bold mb-2"
            htmlFor="grid-refSource"
          >
            Where did you hear about us?
          </label>
          <input
            value={refSource}
            type="text"
            onChange={(e) => setRefSource(e.target.value)}
            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <button className="mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Create Appointment
      </button>
    </form>
  );
}
