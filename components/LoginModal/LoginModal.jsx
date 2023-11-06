"use client";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./LoginModal.css";
import { redirect } from "next/dist/server/api-utils";

function LoginModal({ close, modalFunctions }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const session = useSession();
  const [errors, setErrors] = useState({});
  const [submittedWithErrors, SetSubmittedWithErrors] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   return () => {
  //     dispatch(clearSessionErrors());
  //   };
  // }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

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
        setLoginError("");
        //if quoteFormData object is not empty, then this modal is being opened in the request quote page
        // if (Object.keys(quoteFormData).length > 0) {
        //   const appointment = await fetch("/api/appointments", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //       name: quoteFormData.name,
        //       phone: quoteFormData.phone,
        //       userId: quoteFormData.userId,
        //       address: quoteFormData.address,
        //       stories: quoteFormData.stories,
        //       rooms: quoteFormData.rooms,
        //       pets: quoteFormData.pets,
        //       noTouch: quoteFormData.noTouch,
        //       areaInterest: quoteFormData.areaInterest,
        //       allergies: quoteFormData.allergies,
        //       frequency: quoteFormData.frequency,
        //       refSource: quoteFormData.refSource,
        //     }),
        //   });
        // }
        close(false);
        router.refresh();
      } else if (error) {
        setLoginError("Credentials do not match!");
        return;
      }
    });
    // if (!loginError) {
    //   router.push("/appointments");
    // }
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
        <h2 className="text-xl font-bold">Log In</h2>
        {loginError ? (
          <div className="h-8">{loginError}</div>
        ) : (
          <div className="h-8"></div>
        )}
        <div className="login-password-container input-container">
          <input
            type="text"
            value={email}
            placeholder="Email"
            className="login-email-input login-input"
            onChange={update("email")}
          />
        </div>
        <div className="login-password-container input-container">
          <input
            type="password"
            value={password}
            placeholder="Password"
            className="login-password-input login-input"
            onChange={update("password")}
          />
        </div>
        <input
          type="submit"
          value="Log In"
          className="login-submit-button rounded mt-6 h-12 px-6 bg-logo-blue font-bold hover:bg-highlight-orange disabled:bg-gray-300"
          disabled={!email || !password}
        />
        {/* <button onClick={handleClick} className="demo-button">
          Demo User
        </button> */}
      </form>
      <div className="login-switch-container flex justify-center mt-8 pb-2">
        <span>Don{"'"}t have an account yet?</span>
        <button
          onClick={handleSwitchSignup}
          className="switch-loginmodal-button text-logo-blue hover:text-highlight-orange"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
