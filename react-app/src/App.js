import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Nav/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import MainPage from './components/MainPage/MainPage'
import SplashPage from './components/SplashPage/SplashPage'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const cur = useSelector((state) => state.session.user);


  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <BrowserRouter>
        {loaded && cur ? (
          <Route path="/">
            <MainPage />
          </Route>
        ) : (
          <Route path="/">
            <SplashPage />
          </Route>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
