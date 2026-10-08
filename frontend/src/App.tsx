import { DashboardPage } from './features/dashboard/pages/DashboardPage/DashboardPage';
import { LoginPage } from './features/home/pages/LoginPage/LoginPage';
import { SignupPage } from './features/home/pages/SignupPage/SignupPage';
import { HomePage } from './features/home/pages/HomePage/HomePage';
import { Nav } from './features/home/components/Nav/Nav';
import PageNotFound from './features/error/pages/PageNotFound';
import AuthContext from './shared/context/AuthContext';
import { registerTokenAccessor } from './core/axiosClient';
import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const tokenRef = useRef(token);
  tokenRef.current = token;
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  function login(token: string, email: string) {
    setIsLoggedIn(true);
    setToken(token);
    setUserEmail(email);
    navigate("/boards");
  };

  function logout() {
    setIsLoggedIn(false);
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
      <AuthContext value={{ isLoggedIn, login, logout, token, userEmail }}>
        {isLoggedIn ? 
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