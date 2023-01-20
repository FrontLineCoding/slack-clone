import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './UpdateProfileForm.css';
const SignUpForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [image, setImage] = useState(null);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
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
    if (!password)
      errObj = { ...errObj, password: 'Please Provide a Password' };
    if (password != repeatPassword)
      errObj = { ...errObj, repeat: 'Passwords must match' };

    const userData = new FormData();
    userData.append('first_name', firstName);
    userData.append('last_name', lastName);
    userData.append('email', email);
    userData.append('password', password);

    if (image) {
      userData.append('image', image);
    }

    if (password === repeatPassword && validEmail() && password) {
      const data = await dispatch(signUp(userData));
      if (data) {
        setErrors(data);
      }
    }

    setErrors(Object.values(errObj));
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

  if (user) {
    return <Redirect to="/" />;
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <form onSubmit={onSignUp}>
      <div className="errors">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="signup-form-input-container photo">
        <div className="signup-form-photo-title">PROFILE PHOTO (optional)</div>
        <label htmlFor="file" className="signup-form-input-label photo">
          {!image && <i className="fa-solid fa-camera signup-camera"></i>}
          {image && (
            <img
              className="signup-form-photo"
              src={URL.createObjectURL(image)}
              alt="user pic"
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
      <button className="button" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
