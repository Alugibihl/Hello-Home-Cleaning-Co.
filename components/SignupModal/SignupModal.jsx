import { useState, useEffect } from "react";
import InputField from "@/components/FormComponents/InputField";
import "./SignupModal.css";    

function SignupModal({close, modalFunctions}) {

  const style =
  "appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500";
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

  const handleSwitchLogin = () => {
    close(false);
    modalFunctions.setShowLoginModal(true);
  }

  return (
    <>
      <div>
        <h1>Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center flex-col items-center"
        >
          <InputField
            type="text"
            label="Name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className={style}
          />
          <InputField
            type="email"
            label="Email"
            placeholder="email@email.com"
            value={formData.email}
            onChange={handleChange}
            className={style}
          />

          <InputField
            type="text"
            label="Phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className={style}
          />

          <InputField
            type="password"
            label="Password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={style}
          />

          <InputField
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={style}
          />
          <InputField
            type="text"
            label="Address"
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
        <div className="login-switch-container">
          <span>Already have an account?</span>
          <button onClick={handleSwitchLogin} className="switch-loginmodal-button">Log In</button>
        </div>
      </div>
    </>
  );
}

export default SignupModal;
