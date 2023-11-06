"use client";
import { useState, useEffect } from "react";
import InputField from "@/components/FormComponents/InputField";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./SignupModal.css";

function SignupModal({ close, modalFunctions, values: quoteFormData }) {
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const validateSignUpForm = () => {
    // Validate email
    if (!email.includes("@") || !email.includes(".")) {
      return "Invalid email address";
    }
    // Validate phone number
    if (!phone.match(/\d{10}/)) {
      return "Invalid phone number";
    }
    // Validate password
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    // Validate confirm password
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    if (!address) return "Adress Required";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate the form
    const error = validateSignUpForm();
    if (error) {
      // Display the error to the user
      return;
    }
    // Submit the form data to your server
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        confirmPassword,
        address,
      }),
    });
    // Check the response status
    if (response.ok) {
      const data = {
        email: email,
        password: password,
        redirect: false,
      };
      signIn("credentials", data).then(async ({ ok, error }) => {
        if (ok) {
          //if quoteFormData object is not empty, then this modal is being opened in the request quote page
          if (Object.keys(quoteFormData).length > 0) {
            const appointment = await fetch("/api/appointments", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: quoteFormData.name,
                phone: quoteFormData.phone,
                userId: quoteFormData.userId,
                address: quoteFormData.address,
                stories: quoteFormData.stories,
                rooms: quoteFormData.rooms,
                pets: quoteFormData.pets,
                noTouch: quoteFormData.noTouch,
                areaInterest: quoteFormData.areaInterest,
                allergies: quoteFormData.allergies,
                frequency: quoteFormData.frequency,
                refSource: quoteFormData.refSource,
              }),
            });
          }
          close(false);
          // router.push("/appointments");
          router.refresh();
        }
      });
    } else {
      // Signup failed
      // Display the error to the user
    }
  };

  const handleSwitchLogin = () => {
    close(false);
    modalFunctions.setShowLoginModal(true);
  };

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full items-center justify-center"
        >
          <h2 className="mb-4 font-bold text-xl">Sign Up</h2>
          <div className="flex flex-row mb-4">
            <InputField
              type="text"
              name="name"
              label="Name"
              placeholder="John Doe"
              value={name}
              setValue={setName}
              className=""
            />
            <InputField
              type="email"
              name="email"
              label="Email"
              placeholder="email@email.com"
              value={email}
              setValue={setEmail}
              className=""
            />
          </div>
          <div className="flex flex-row mb-4">
            <InputField
              type="text"
              name="phone"
              label="Phone"
              placeholder="Phone number"
              value={phone}
              setValue={setPhone}
              className=""
            />
            <InputField
              type="text"
              name="address"
              label="Address"
              placeholder="Address"
              value={address}
              setValue={setAddress}
              className=""
            />
          </div>
          <div className="flex flex-row mb-4">
            <InputField
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              value={password}
              setValue={setPassword}
              className=""
            />
            <InputField
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              setValue={setConfirmPassword}
              className=""
            />
          </div>
          <button
            className="mt-6 h-12 px-6 bg-logo-blue hover:bg-highlight-orange text-white font-bold rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="login-switch-container flex justify-center mt-8 pb-2">
          <span>Already have an account?</span>
          <button
            onClick={handleSwitchLogin}
            className="switch-loginmodal-button text-logo-blue hover:text-highlight-orange"
          >
            Log In
          </button>
        </div>
      </div>
    </>
  );
}

export default SignupModal;
