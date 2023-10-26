'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Dialog from "@/components/Dialog";
const style = "appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

const SignupPage = () => {
    const router = useRouter();

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
            const {email, hashedPassword} = await response.json();
            console.log("email/pass: ", email, hashedPassword);
            router.push("/signIn");

        } else {
            // Signup failed
            // Display the error to the user
        }
    };

    const signUp = (
      <dialog open className="bg-teal-600">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
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
            placeholder="Email address"
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
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={style}
          />
          <input
            type="text"
            name="address"
            placeholder="address"
            value={formData.address}
            onChange={handleChange}
            className={style}
          />
          <button type="submit">Sign Up</button>
        </form>
      </dialog>
  )
  return <Dialog component={signUp} />
};

export default SignupPage;
