"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InputField from "@/components/FormComponents/InputField";
import SubmitButton from "@/components/FormComponents/SubmitButton";
import Loading from "@/components/Loding";

export default function Page({ params }) {
  const session = useSession();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [stories, setStories] = useState("");
  const [rooms, setRooms] = useState("");
  const [pets, setPets] = useState("");
  const [noTouch, setNoTouch] = useState("None");
  const [areaInterest, setAreaInterest] = useState("None");
  const [allergies, setAllergies] = useState(false);
  const [frequency, setFrequency] = useState("none");
  const [refSource, setRefSource] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  let user = session?.data?.user;
  console.log("USER: ", user);

  if (session?.data?.status === "unauthenticated" || !user) router.push("/");

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/appointments/${params.id}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        const { appointment } = data;
        setName(appointment.name);
        setDate(appointment.date);
        setPhone(appointment.phone);
        setAddress(appointment.address);
        setStories(appointment.stories);
        setRooms(appointment.rooms);
        setPets(appointment.pets);
        setNoTouch(appointment.noTouch);
        setAreaInterest(appointment.areaInterest);
        setAllergies(appointment.allergies);
        setFrequency(appointment.frequency);
        setRefSource(appointment.refSource);
      })
      .then(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ERROR HANDLING

    await fetch(`/api/appointments/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        date,
        phone,
        address,
        stories,
        rooms,
        pets,
        noTouch,
        areaInterest,
        allergies,
        frequency,
        refSource,
      }),
    });

    router.push("/appointments");
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Update your Appointment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              name="name"
              type="text"
              value={name}
              setValue={setName}
            />
            {/* <InputField
              label="Today's Date"
              type="date"
              name="date"
              value={date}
              setValue={setDate}
            /> */}
            <InputField
              label="Phone Number"
              type="text"
              name="phone"
              value={phone}
              setValue={setPhone}
            />
            <InputField
              label="Address"
              type="text"
              name="address"
              value={address}
              setValue={setAddress}
            />
            <InputField
              label="How many stories does your home have?"
              type="text"
              name="stories"
              value={stories}
              setValue={setStories}
            />
            <InputField
              label="How many bedrooms and bathrooms?"
              type="text"
              name="rooms"
              value={rooms}
              setValue={setRooms}
            />
            <InputField
              label="Do you have any Pets?"
              type="text"
              name="pets"
              value={pets}
              setValue={setPets}
            />
            <InputField
              label="Any areas you would like us to avoid?"
              type="text"
              name="noTouch"
              value={noTouch}
              setValue={setNoTouch}
            />
            <InputField
              label="Any areas you would like us to focus on?"
              type="text"
              name="focus"
              value={areaInterest}
              setValue={setAreaInterest}
            />
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full pl-4 pt-4">
              <label
                className="block text-gray-700 text-s font-bold mt-2"
                htmlFor="grid-allergies"
              >
                Is anyone in your home allergic to Clove, Cinnamon, or Orange?
              </label>
              <div className="flex">
                <label style={{ marginRight: "10px" }}>
                  <input
                    type="checkbox"
                    name="allergies"
                    checked={allergies}
                    onChange={(e) => setFormData((e) => setAllergies(true))}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="allergies"
                    checked={!allergies}
                    onChange={(e) => setFormData((e) => setAllergies(false))}
                  />
                  No
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full px-3">
              <label
                className="block text-gray-700 text-s font-bold mb-2"
                htmlFor="grid-frequency"
              >
                How frequently are you looking to have cleanings?
              </label>
              <select
                id="frequency"
                name="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="appearance-none w-1/2 block bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="None">None</option>
                <option value="2">Every 2 weeks</option>
                <option value="3">Every 3 weeks</option>
                <option value="4">Every 4 weeks</option>
              </select>
            </div>
          </div>

          <InputField
            type="text"
            label="Where did you hear about us?"
            value={refSource}
            setValue={setRefSource}
          />

          <div className="pl-3">
            <SubmitButton type="submit" buttonText="Update Appointment" />
          </div>
        </form>
      </div>
    </>
  );
}
