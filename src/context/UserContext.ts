import { createContext } from "react";

export type User = {
  id: string;
  email: string;
  name: string;
};

export type UserContext = {
  accessToken?: string;
  refreshToken?: string;
  user?: User;
  isAuthorized: boolean;
  signIn: (user: User, accessToken: string, refreshToken: string) => void;
  updateUser: (user: User) => void;
  logOut: () => void;
};

export default createContext<UserContext>({} as UserContext);
