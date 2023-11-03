"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
// import axios from "axios";
// import { getServerSession } from "next-auth";
import InputField from "@/components/FormComponents/InputField";
import SubmitButton from "@/components/FormComponents/SubmitButton";
import Modal from "@/components/Modal/Modal";
import SignupModal from "@/components/SignupModal/SignupModal";
import LoginModal from "@/components/LoginModal/LoginModal";

export default function Page() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const session = useSession();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    phone: "",
    address: "",
    stories: "",
    rooms: "",
    pets: "",
    noTouch: "None",
    areaInterest: "None",
    refSource: "",
    allergies: false,
    frequency: "None",
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 2000);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // const [errors, setErrors] = useState({});

  // const validateFields = () => {

  //   if (!formData.name) {
  //     setErrors({ ...errors, name: "Name required" });
  //   }

  //   if (!formData.date) {
  //     setErrors({ ...errors, date: "Date required" });
  //   }
  //   if (!formData.phone.match(/\d{10}/)) {
  //     setErrors["phone"] = "Invalid phone number";
  //   }
  //   if (!formData.address) {
  //     setErrors["address"] = "Address required";
  //   }
  //   if (!formData.stories) {
  //     setErrors["stories"] = "Stories required";
  //   }
  //   if (!formData.rooms) {
  //     setErrors["rooms"] = "Rooms required";
  //   }
  //   if (!formData.pets) {
  //     setErrors["pets"] = "Pets required";
  //   }
  //   if (!formData.noTouch) {
  //     setErrors["noTouch"] = "No touch required";
  //   }
  //   if (!frequency) {
  //     setErrors["frequency"] = "Frequency required";
  //   }
  // };

  const modalFunctions = {
    setShowLoginModal: (shown) => setShowLoginModal(shown),
    setShowSignupModal: (shown) => setShowSignupModal(shown),
  };

  const handleSignin = () => {
    setShowLoginModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const userId = session.data?.user?.id;
  const router = useRouter();

  // if (!session || !session.data?.user) router.push("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrors({});
    // validateFields();
    // if (Object.keys(errors).length > 0) {
    //   return;
    // }



    if (!session.data?.user) {
      handleSignin();
    } else {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          date: formData.date,
          phone: formData.phone,
          userId: formData.userId,
          address: formData.address,
          stories: formData.stories,
          rooms: formData.rooms,
          pets: formData.pets,
          noTouch: formData.noTouch,
          areaInterest: formData.areaInterest,
          allergies: formData.allergies,
          frequency: formData.frequency,
          refSource: formData.refSource,
        }),
      });

      router.push("/appointments");
        }
  };

  // router.push("/appointments");
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Appointment</h2>   
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Full Name"
          name="name"
          type="text"
          value={formData.name}
          setValue={handleChange}
        />
        <InputField
          label="Today's Date"
          type="date"
          name="date"
          value={formData.date}
          setValue={handleChange}
        />
        <InputField
          label="Phone Number"
          type="text"
          name="phone"
          value={formData.phone}
          setValue={handleChange}
        />
        <InputField
          label="Address"
          type="text"
          name="address"
          value={formData.address}
          setValue={handleChange}
        />
        <InputField
          label="How many stories does your home have?"
          type="text"
          name="stories"
          value={formData.stories}
          setValue={handleChange}
        />
        <InputField
          label="How many bedrooms and bathrooms?"
          type="text"
          name="rooms"
          value={formData.rooms}
          setValue={handleChange}
        />
        <InputField
          label="Do you have any Pets?"
          type="text"
          name="pets"
          value={formData.pets}
          setValue={handleChange}
        />
        <InputField
          label="Any areas you would like us to avoid?"
          type="text"
          name="noTouch"
          value={formData.noTouch}
          setValue={handleChange}
        />
        <InputField
          label="Any areas you would like us to focus on?"
          type="text"
          name="focus"
          value={formData.areaInterest}
          setValue={handleChange}
        />
        </div>
         <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block text-gray-700 text-s font-bold mb-2"
                            htmlFor="grid-allergies"
                        >
                            Is anyone in your home allergic to Clove, Cinnamon, or Orange?
                        </label>
                        <input
                            type="checkbox"
                            checked={formData.allergies}
                            name="allergies"
                            onChange={(e) =>
                                setFormData({ ...formData, [e.target.name]: e.target.checked })
                            }
                            className="mb-4"
                            // onChange={(e) => setAllergies(e.target.checked)}
                        />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
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
                            value={formData.frequency}
                            onChange={(e) =>
                                setFormData({ ...formData, [e.target.name]: e.target.value })
                            }
                            className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        >
              <option value="None">None</option>
              <option value="2">Every 2 weeks</option>
              <option value="3">Every 3 weeks</option>
              <option value="4">Every 4 weeks</option>
            </select>
          </div>
        </div>
        <InputField
          label="Where did you hear about us?"
          type="text"
          name="refSource"
          value={formData.refSource}
          setValue={handleChange}
        />
        <SubmitButton type="submit" buttonText="Create Appointment" />
      </form>
      {showLoginModal && (
        <Modal
          component={LoginModal}
          close={() => setShowLoginModal(false)}
          modalFunctions={modalFunctions}
          values={formData}
        />
      )}
      {showSignupModal && (
        <Modal
          component={SignupModal}
          close={(shown) => setShowSignupModal(shown)}
          modalFunctions={modalFunctions}
          values={formData}
        />
      )}
      </div>
    </>
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
