import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import "./LoginModal.css";

function LoginModal({close, modalFunctions}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const session = useSession();
  const [errors, setErrors] = useState({});
  const [submittedWithErrors, SetSubmittedWithErrors] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).length) {
      SetSubmittedWithErrors(true);
      return;
    }

    const data = {
      email,
      password,
    };
    signIn("credentials", data);
  };

  // const handleClick = () => {
  //   dispatch(login({ email: "demouser@user.io", password: "password" }));
  //   close(false);
  // };

  const handleSwitchSignup = () => {
    close(false);
    modalFunctions.setShowSignupModal(true);
  }

  return (
    <div className="flex flex-col">
      <form className="session-form" onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <div className="errors">{errors?.email}</div>
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
        <input type="submit" value="Log In" className="login-submit-button" disabled={!email || !password} />
        {/* <button onClick={handleClick} className="demo-button">
          Demo User
        </button> */}
      </form>
      <div className="login-switch-container flex justify-center mt-8">
            <span>Don't have an account yet?</span>
            <button onClick={handleSwitchSignup} className="switch-loginmodal-button">Sign up</button>
      </div>
    </div>
  );
}

export default LoginModal;
