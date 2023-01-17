import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link, Route, Switch, useHistory } from 'react-router-dom';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import NavBar from './NavBar/NavBar';
import './SplashPage.css';
import Github from '../../svgFiles/github.svg';
import linkedin from '../../svgFiles/linkedin.svg';

const SplashPage = () => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [showContributors, setShowContributors] = useState(false);

  const handleContributorsClick = (e) => {
    setShowContributors(!showContributors);
    e.preventDefault();
  };

  useEffect(() => {
    if (user) {
      history.push('/me');
    }
  }, [user, history]);

  return (
    <div className="splash-page">
      <div className="splash-page-header-sidebar-container">
        <div className="splash-header-links">
          {/*
          <NavLink className="splash-page-header-link" to="/" exact={true}>
            <i className="fa-brands fa-discord"></i>
            <span className="splash-page-header-name">TAUT</span>
          </NavLink>
  */}
          <Link
            className="repo-link"
            to={{ pathname: 'https://github.com/FrontLineCoding/slack-clone' }}
            target="_blank"
          >
            <img src={Github} alt="github" />
          </Link>
        </div>
        <div className="hero-text">
          <div
            className="hero-text-header"
            onClick={() => {
              history.push('/');
            }}
          >
            TAUT...
          </div>
          <div className="hero-text-content">
            connect with others and get. it. done.
          </div>
        </div>
        <div className="contributors">
          <button
            className="contributors-btn"
            onClick={handleContributorsClick}
          >
            Contributor
          </button>
          <div className="contributor-container">
            <Link
              className="contributor-link"
              to={{
                pathname: 'https://www.linkedin.com/in/andrew-parks-0286ba225/',
              }}
              target="_blank"
            >
              <span className="contributor-name">Andrew Parks</span>
              <img
                className="github-img"
                src={linkedin}
                alt="Andrew Linked In"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="auth-container">
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <SignUpForm />
          </Route>
          <Route path="/">
            <NavBar />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default SplashPage;
