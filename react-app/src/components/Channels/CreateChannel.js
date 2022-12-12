import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addChannel } from "../../store/channels";
import "./ChannelFormStyling.css"


const CreateChannel = ({setShowModal}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const workspaceId = useSelector(state => state.workspaces.current.id);


  useEffect(() => {
    const submitButton = document.querySelector(
      ".create-channel-form-button-submit"
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload ={
        name: "",
        workspace_id: workspaceId
    };

    payload.name = name;

    await dispatch(addChannel(workspaceId, payload)).then((res) => {
        if(res?.error) {
            let errors = [res?.error];
            setErrors(errors);
            return;
        } else {
            setErrors([]);
            history.push(`/${workspaceId}`);
            setShowModal(false);
          }
    })

  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setShowModal(false);
    history.push(`/${workspaceId}`)
  };

  return (
    <section className="create-channel-form-container">
      <div className="create-channel-form-header">Adding Channel to Workspace</div>
      <form className="create-channel-form" onSubmit={handleSubmit}>
        <div className="create-channel-input-container">
          <label>CHANNEL NAME</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={updateName}
            className="channel-modal-name"
          />
        </div>
        <ul className="errors">
          {errors.map((error, i) => {
            return (
              <div key={i} className="error">
                <li>{error}</li>
              </div>
            );
          })}
        </ul>
        <div className="create-channel-form-buttons">
          <button
            className="create-channel-form-button cancel"
            type="button"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button className="create-channel-form-button-submit" type="submit">
            Add New Channel
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateChannel;
