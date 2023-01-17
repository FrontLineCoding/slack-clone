import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addUserToWorkspace } from '../../store/users';

import { addWorkspace } from '../../store/workspace';
import './Nav.css';

const CreateWorkspaceForm = ({ hideForm, setChannelAdd }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [name, setName] = useState('');
  const [workspaceImg, setWorkspaceImg] = useState(null);
  const [errors, setErrors] = useState([]);

  const isValidUrl = (urlString) => {
    var inputElement = document.createElement('input');
    inputElement.type = 'url';
    inputElement.value = urlString;

    if (!inputElement.checkValidity()) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    const submitButton = document.querySelector(
      '.create-workspace-form-button-submit'
    );
    if (name) {
      submitButton.classList.add('typed');
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.classList.remove('typed');
      submitButton.setAttribute('disabled', '');
    }
  }, [name]);

  const updateName = (e) => setName(e.target.value);
  const updatePhoto = (e) => {
    const file = e.target.files[0];
    if (file) setWorkspaceImg(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdWorkspace = new FormData();
    createdWorkspace.append('name', name);
    createdWorkspace.append('owner_id', user.id);
    if (workspaceImg) createdWorkspace.append('img', workspaceImg);

    if (name) {
      const data = await dispatch(addWorkspace(createdWorkspace)).then(
        (res) => {
          setChannelAdd(true);
          console.log(res);
          dispatch(addUserToWorkspace(user.id, res?.id));
        }
      );
      hideForm();

      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(["Name isn't valid"]);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className="create-workspace-form-container">
      <div className="create-workspace-form-header">
        Customize Your Workspace
      </div>
      <form className="create-workspace-form" onSubmit={handleSubmit}>
        <div className="create-workspace-photo-container">
          <label>
            {workspaceImg && (
              <img
                src={URL.createObjectURL(workspaceImg)}
                className="workspace-form-image"
                alt="workspace pic"
              ></img>
            )}
          </label>
          <input
            type="file"
            id="file"
            onChange={updatePhoto}
            accept="/image/*"
            className="workspace-modal-name"
          />
        </div>
        <div className="create-workspace-input-container">
          <label>WORKSPACE NAME</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={updateName}
            className="workspace-modal-name"
          />
        </div>
        <ul className="errors">
          {/*}
          {errors.map((error, i) => {
            return (
              <div key={i} className="error">
                <li>{error.message}</li>
              </div>
            );
          })}
        */}
        </ul>
        <div className="create-workspace-form-buttons">
          <button
            className="create-workspace-form-button cancel"
            type="button"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button className="create-workspace-form-button-submit" type="submit">
            Create New Workspace
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateWorkspaceForm;
