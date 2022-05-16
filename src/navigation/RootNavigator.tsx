import React, { useState } from "react";
import AuthorizedNavigator from "./AuthorizedNavigator";
import UnauthorizedNavigator from "./UnauthorizedNavigator";

const Root = () => {
  const [isAuthorized, setIsAuthorized] = useState(true);

  if (isAuthorized) {
    return <AuthorizedNavigator />;
  }

  return <UnauthorizedNavigator />;
};

export default Root;
