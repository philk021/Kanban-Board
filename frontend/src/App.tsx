import { DashboardPage } from './features/dashboard';
import { Nav } from './features/home/components/Nav/Nav';
import { HomePage, LoginPage, SignupPage } from './features/home';
import { PageNotFound } from './features/error';
import { registerTokenAccessor } from './core/axiosClient';
import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthContext from './shared/context/AuthContext';
import './App.css';

function App() {
  const [userEmail, setUserEmail] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const tokenRef = useRef(token);
  tokenRef.current = token;

  const login = (token: string, email: string) => {
    setLoggedIn(true);
    setToken(token);
    setUserEmail(email);
    navigate("/boards");
  };

  const logout = () => {
    setLoggedIn(false);
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    registerTokenAccessor({
      getAccessToken: () => tokenRef.current,
      getRefreshToken: () => null,
      setAccessToken: (t) => setToken(t),
      clearTokens: () => setToken(''),
    });
  }, []);

  return (
    <>
      <AuthContext value={{ loggedIn, login, logout, token, userEmail }}>
        {loggedIn ? 
          <Routes>
            <Route path='/boards/*' element={ <DashboardPage /> }/>
            <Route path='*' element={ <PageNotFound /> }/>
          </Routes> :
          <>
            <Nav/> 
            <Routes>
              <Route path='/' element={ <HomePage /> }/>
              <Route path='/login' element={ <LoginPage /> }/>
              <Route path='/signup' element={ < SignupPage /> }/>
              <Route path='*' element={ <PageNotFound /> }/>
            </Routes>
          </>}
      </AuthContext>
    </>
  );
}

export default App;