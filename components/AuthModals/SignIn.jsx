"use client";
import GoogleButton from "react-google-button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/FormComponents/InputField";
import ErrorText from "@/components/FormComponents/ErrorText";
import SubmitButton from "@/components/FormComponents/SubmitButton";

const SignInPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const session = useSession();
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [submittedWithErrors, SetSubmittedWithErrors] = useState(false);

  useEffect(() => {
    const errorsObj = {};
    if (!email) errorsObj.email = "Please type your password";
    if (!password) errorsObj.password = "Please type your password";
    setErrors(errorsObj);
  }, [email, password]);

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
  if (session.status === "authenticated") router.push("/");
  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label={"Email"}
        placeholder="Email@email.com"
        value={email}
        setValue={setEmail}
        type={"text"}
      />
      {submittedWithErrors && errors.email && (
        <ErrorText error={errors.email} />
      )}
      <InputField
        label={"Password"}
        value={password}
        setValue={setPassword}
        type={"password"}
        placeholder="Phone number"
      />
      {submittedWithErrors && errors.password && (
        <ErrorText error={errors.password} />
      )}
      <SubmitButton buttonText={"Submit"} />
    </form>
  );
};
export default SignInPage;
