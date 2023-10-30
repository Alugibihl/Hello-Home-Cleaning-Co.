"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const style =
  "appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500";

const SignupPage = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateSignUpForm = () => {
    // Validate email
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      return "Invalid email address";
    }
    // Validate phone number
    if (!formData.phone.match(/\d{10}/)) {
      return "Invalid phone number";
    }
    // Validate password
    if (formData.password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    if (!formData.address) return "Adress Required";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data: ", formData);
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
      body: JSON.stringify(formData),
    });
    // Check the response status
    if (response.ok) {
      // Signup successful!
      const { email, hashedPassword } = await response.json();
      console.log("email/pass: ", email, hashedPassword);
      router.push("/signIn");
    } else {
      // Signup failed
      // Display the error to the user
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center flex-col items-center"
      >
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          className={style}
        />
        <input
          type="email"
          name="email"
          placeholder="email@email.com"
          value={formData.email}
          onChange={handleChange}
          className={style}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          className={style}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={style}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={style}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className={style}
        />
        <button
          className="mb-6 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
