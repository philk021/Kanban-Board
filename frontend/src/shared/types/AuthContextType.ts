export type AuthContextType =  {
    loggedIn: boolean,
    login: (_token: string, _user_email: string) => void, 
    logout: () => void,
    token: string,
    userEmail: string
}