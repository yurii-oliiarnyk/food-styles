import React, { useState } from "react";
import SignInOptions from "./pages/SignInOptions";
import SignUp from "./pages/SignUp";

const Root = () => {
  const [signUp, setSingUp] = useState(false);

  const signUpWithEmail = () => {
    setSingUp(true);
  };

  if (signUp) {
    return <SignUp back={() => setSingUp(false)} />;
  }

  return <SignInOptions signUpWithEmail={signUpWithEmail} />;
};

export default Root;
