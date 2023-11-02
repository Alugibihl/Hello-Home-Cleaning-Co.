"use client";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./LoginModal.css";
import { redirect } from "next/dist/server/api-utils";

function LoginModal({ close, modalFunctions, values: quoteFormData }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const session = useSession();
  const [errors, setErrors] = useState({});
  const [submittedWithErrors, SetSubmittedWithErrors] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const errorsObj = {};
    if (!email) errorsObj.email = "Please enter your email";
    if (!password) errorsObj.password = "Please enter your password";
    setErrors(errorsObj);
  }, [email, password]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(clearSessionErrors());
  //   };
  // }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  async function test(data) {
    console.log(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    if (Object.values(errors).length) {
      SetSubmittedWithErrors(true);
      return;
    }

    const data = {
      email,
      password,
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
              date: quoteFormData.date,
              phone: quoteFormData.phone,
              userId: quoteFormData.userId,
              address: quoteFormData.address,
              stories: quoteFormData.stories,
              rooms: quoteFormData.rooms,
              pets: quoteFormData.pets,
              noTouch: quoteFormData.noTouch,
              focus: quoteFormData.focus,
              allergies: quoteFormData.allergies,
              frequency: quoteFormData.frequency,
              refSource: quoteFormData.refSource,
            }),
          });
        }
        close(false);
        router.push("/appointments");
      }
      if (error) {
        setLoginError("Credentials do not match!");
      }
    });
  };

  // const handleClick = () => {
  //   dispatch(login({ email: "demouser@user.io", password: "password" }));
  //   close(false);
  // };

  const handleSwitchSignup = () => {
    close(false);
    modalFunctions.setShowSignupModal(true);
  };

  return (
    <div className="flex flex-col">
      <form className="session-form" onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <div className="errors">{errors?.email}</div>
        {loginError && <div>{loginError}</div>}
        <div className="login-password-container input-container">
          <span className="email-label input-label">Email</span>
          <input
            type="text"
            value={email}
            className="login-email-input login-input"
            onChange={update("email")}
          />
        </div>
        <div className="errors">{errors?.password}</div>
        <div className="login-password-container input-container">
          <span className="password-label input-label">Password</span>
          <input
            type="password"
            value={password}
            className="login-password-input login-input"
            onChange={update("password")}
          />
        </div>
        <input
          type="submit"
          value="Log In"
          className="login-submit-button"
          disabled={!email || !password}
        />
        {/* <button onClick={handleClick} className="demo-button">
          Demo User
        </button> */}
      </form>
      <div className="login-switch-container flex justify-center mt-8">
        <span>Don't have an account yet?</span>
        <button
          onClick={handleSwitchSignup}
          className="switch-loginmodal-button"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
