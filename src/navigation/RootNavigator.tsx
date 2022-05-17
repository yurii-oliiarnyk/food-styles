import React, { useState } from "react";
import AuthorizedNavigator from "./AuthorizedNavigator";
import UnauthorizedNavigator from "./UnauthorizedNavigator";

const Root = () => {
  const [isAuthorized, setIsAuthorized] = useState(true);

  const logOut = () => setIsAuthorized(false);
  const logIn = () => setIsAuthorized(true);

  if (isAuthorized) {
    return <AuthorizedNavigator logOut={logOut} />;
  }

  return <UnauthorizedNavigator logIn={logIn} />;
};

export default Root;
