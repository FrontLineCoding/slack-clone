import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/users';
import './UpdateProfileForm.css';

const UpdateProfileForm = ({ user, hideForm }) => {
  console.log(user);
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [image, setImage] = useState(user?.img);
  const [showChangePassword, setShowChangePassword] = useState(false);
  //   const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let errObj = {};

    const validEmail = () => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };

    if (!firstName)
      errObj = { ...errObj, firstname: 'Please Provide Your First Name' };
    if (!lastName)
      errObj = { ...errObj, lastname: 'Please Provide Your Last Name' };
    if (!validEmail())
      errObj = { ...errObj, email: 'Please Provide a Valid email' };
    if (showChangePassword && !password)
      errObj = { ...errObj, password: 'Please Provide a Password' };
    if (showChangePassword && password != repeatPassword)
      errObj = { ...errObj, repeat: 'Passwords must match' };

    const userData = new FormData();
    userData.append('first_name', firstName);
    userData.append('last_name', lastName);
    userData.append('email', email);
    if (password) {
      userData.append('password', password);
    }

    if (image) {
      userData.append('image', image);
    }

    if (password === repeatPassword && validEmail() && password) {
      const data = await dispatch(updateUser(userData));
      if (data) {
        setErrors(data);
      }
    }

    setErrors(Object.values(errObj));
    if (errors.length === 0) {
      const data = await dispatch(updateUser(user.id, userData));
      if (data) {
        setErrors(data);
      }
      hideForm();
    }
  };

  const handleCancel = () => {
    hideForm();
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <form className="update-profile-information-form" onSubmit={handlesubmit}>
      <div className="errors">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="signup-form-input-container photo">
        <div className="signup-form-photo-title">PROFILE PHOTO</div>
        <label htmlFor="file" className="signup-form-input-label photo">
          {!image && <i className="fa-solid fa-camera signup-camera"></i>}
          {image && (
            <img
              className="update-form-photo"
              //   src={URL.createObjectURL(image)}
              src={image}
              alt="server pic"
            ></img>
          )}
        </label>
        <input
          id="file"
          type="file"
          className="signup-form-photo-input"
          onChange={updateFile}
          accept="image/*"
        />
      </div>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="First Name"
          onChange={updateFirstName}
          value={firstName}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="Last Name"
          onChange={updateLastName}
          value={lastName}
        ></input>
      </div>

      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      {!showChangePassword && (
        <div
          className="change-password"
          onClick={() => {
            setShowChangePassword(true);
          }}
        >
          Change Password
        </div>
      )}
      {showChangePassword && (
        <>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>

          <div>
            <label>Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              // required={true}
            ></input>
          </div>
        </>
      )}
      <button className="button save-changes" type="submit">
        Save
      </button>
      <button className="cancel" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default UpdateProfileForm;
