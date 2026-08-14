import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    login: (_token: string, _user_email: string) => {}, 
    logout: () => {},
    token: "",
    userEmail: ""
});
export default AuthContext;