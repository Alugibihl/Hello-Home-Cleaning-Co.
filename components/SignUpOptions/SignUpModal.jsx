import { useRouter } from "next/router";
import Modal from "./Modal";
import { useState } from "react";

const SignupModal = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
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
    if (!formData.phoneNumber.match(/\d{10}/)) {
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
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    // Check the response status
    if (response.status === 200) {
      // Signup successful!
      router.push("/dashboard");
    } else {
      // Signup failed
      // Display the error to the user
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>

      <Modal onClose={() => {}}>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
          />

          <input
            type="tel"
            name="phoneNumber"


placeholder="Phone number"
          />
<input
type="password"
name="password"
placeholder="Password"
          />



<input


type="password"


name="confirmPassword"


placeholder="Confirm password"
          />



<button

type="submit">Sign Up</button>
        </form>
      </Modal>
    </div>
  );
};

export default SignupModal;
