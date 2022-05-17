import { createContext } from "react";
import { User } from "../types";

export type UserContext = {
  accessToken?: string;
  refreshToken?: string;
  user?: User;
  isAuthorized: boolean;
  signIn: (
    user: User,
    accessToken: string,
    credentials: { email: string; password: string },
  ) => void;
  updateUser: (user: User) => void;
  logOut: () => void;
};

export default createContext<UserContext>({} as UserContext);
