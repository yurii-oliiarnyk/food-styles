import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import AuthorizedNavigator from "./AuthorizedNavigator";
import UnauthorizedNavigator from "./UnauthorizedNavigator";

const Root = () => {
  const { isAuthorized } = useContext(UserContext);

  if (isAuthorized) {
    return <AuthorizedNavigator />;
  }

  return <UnauthorizedNavigator />;
};

export default Root;
