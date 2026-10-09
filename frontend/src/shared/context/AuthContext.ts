import { createContext } from "react";
import type { AuthContextType } from "../types/AuthContextType";

const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
  login: () => {}, 
  logout: () => {},
  token: "",
  userEmail: ""
});
export default AuthContext;