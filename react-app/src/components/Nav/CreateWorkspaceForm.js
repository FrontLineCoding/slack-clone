import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addWorkspace } from "../../store/workspace";
import "./Nav.css"


const CreateWorkspaceForm = ({hideForm}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [workspaceImg, setWorkspaceImg] = useState("");
  const [errors, setErrors] = useState([]);

  const isValidUrl = (urlString) => {
    var inputElement = document.createElement("input");
    inputElement.type = "url";
    inputElement.value = urlString;

    if (!inputElement.checkValidity()) {
      return false;
    } else {
      return true;
    }
  };



  useEffect(() => {
    const submitButton = document.querySelector(
      ".create-workspace-form-button-submit"
    );
    if (name) {
      submitButton.classList.add("typed");
      submitButton.removeAttribute("disabled");
    } else {
      submitButton.classList.remove("typed");
      submitButton.setAttribute("disabled", "");
    }
  }, [name]);

  const updateName = (e) => setName(e.target.value);
  const updatePhoto = (e) => {setWorkspaceImg(e.target.value)}

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload ={
        name: "",
        owner_id: 0,
        img: ""
    };

    payload.name = name;
    if (workspaceImg) {
      if(isValidUrl(workspaceImg)){
        payload.img = workspaceImg;
        await dispatch(addWorkspace(payload)).then((res) => {
          if(res?.error) {
              let errors = [res?.error];
              setErrors(errors);
              return;
          } else {
              setErrors([]);
              history.push(`/`);
              hideForm();
          }
      })
      }else{
        setErrors([{"message": "Not a Valid URL"}])
        return;
      }
    }else{

      await dispatch(addWorkspace(payload)).then((res) => {
          if(res?.error) {
              let errors = [res?.error];
              setErrors(errors);
              return;
          } else {
              setErrors([]);
              history.push(`/`);
              hideForm();
          }
      })
    }



    //   history.push(`/`);
    //   setShowForm(false);

  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className="create-workspace-form-container">
      <div className="create-workspace-form-header">Customize Your Workspace</div>
      <form className="create-workspace-form" onSubmit={handleSubmit}>
        <div className="create-workspace-photo-container">
            <label></label>
            <input
            type="text"
            placeholder="Photo URL"
            value={workspaceImg}
            onChange={updatePhoto}
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
          {errors.map((error, i) => {
            return (
              <div key={i} className="error">
                <li>{error.message}</li>
              </div>
            );
          })}
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
