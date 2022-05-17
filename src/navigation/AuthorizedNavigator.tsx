import React from "react";
import ProfileScreen from "../screens/authorized/ProfileScreen";

const AuthorizedNavigator = ({ logOut }: { logOut: () => void }) => {
  return <ProfileScreen logOut={logOut} />;
};

export default AuthorizedNavigator;
