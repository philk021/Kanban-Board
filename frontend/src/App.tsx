import './App.css';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Home/Login';
import Signup from './components/Home/Signup';
import Nav from './components/Home/Nav';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PageNotFound from './components/Shared/PageNotFound';
import AuthContext from '../src/context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { registerTokenAccessor } from './core/axiosClient';

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
            <Route path='/boards/*' element={ <Dashboard/> }/>
            <Route path='*' element={ <PageNotFound/> }/>
          </Routes> :
          <>
            <Nav/> 
            <Routes>
              <Route path='/' element={ <Home/> }/>
              <Route path='/login' element={ <Login /> }/>
              <Route path='/signup' element={ < Signup /> }/>
              <Route path='*' element={ <PageNotFound/> }/>
            </Routes>
          </>}
      </AuthContext>
    </>
  );
}

export default App;