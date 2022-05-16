import React, { useState } from "react";
import SignInScreen from "./screens/SignInScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignUpScreen from "./screens/SignUpScreen";

enum Screens {
  SIGN_IN = "sign-in",
  SIGN_IN_EMAIL = "sign-in-email",
  SIGN_UP_EMAIL = "sing-up-email",
}

const Root = () => {
  const [page, setPage] = useState(Screens.SIGN_IN);

  if (page === Screens.SIGN_UP_EMAIL) {
    return <SignUpScreen back={() => setPage(Screens.SIGN_IN)} />;
  }

  if (page === Screens.SIGN_IN_EMAIL) {
    return <SignInScreen back={() => setPage(Screens.SIGN_IN)} />;
  }

  return (
    <WelcomeScreen
      signUpWithEmail={() => setPage(Screens.SIGN_UP_EMAIL)}
      signInWithEmail={() => setPage(Screens.SIGN_IN_EMAIL)}
    />
  );
};

export default Root;
