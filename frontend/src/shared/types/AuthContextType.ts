export type AuthContextType =  {
    isLoggedIn: boolean,
    login: (_token: string, _user_email: string) => void, 
    logout: () => void,
    token: string,
    userEmail: string
}