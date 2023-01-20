import { useDispatch, useSelector } from 'react-redux';
import logoutSVG from '../../svgFiles/logout.svg';
import { logout } from '../../store/session';
import './Auth.css';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import UpdateProfileModal from './UpdateProfileModal';

const AuthNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  const handleUserProfileClick = () => {
    setShowUserOptions(!showUserOptions);
  };

  const handleChangeImage = () => {
    setShowUserOptions(false);
    setShowUpdateProfile(true);
  };

  return (
    <div className="auth-nav">
      {showUserOptions && (
        <div
          className="user-options"
          onMouseLeave={() => {
            setShowUserOptions(false);
          }}
        >
          <div onClick={handleChangeImage}>Update Profile Information</div>
        </div>
      )}
      {user?.img ? (
        <div className={`auth-user-pic`} onClick={handleUserProfileClick}>
          <img src={`${user?.img}`} />
        </div>
      ) : (
        <div className="initials" onClick={handleUserProfileClick}>
          {user?.first_name[0]}
          {user?.last_name[0]}
        </div>
      )}
      <img src={logoutSVG} onClick={handleLogout} />

      {showUpdateProfile && (
        <UpdateProfileModal hideForm={setShowUpdateProfile} user={user} />
      )}
    </div>
  );
};

export default AuthNav;
