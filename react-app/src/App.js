import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage/SplashPage';
// import NavBar from './components/Nav/NavBar'
import MainPage from './components/MainPage/MainPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const cur = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
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
            <MainPage user={cur} />
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
