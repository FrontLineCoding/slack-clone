import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editChannel } from "../../store/channels";
import "./Channels.css"


const EditChannel = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {channelId} = useParams();

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

    await dispatch(editChannel(channelId, workspaceId, payload)).then((res) => {
        if(res?.error) {
            let errors = [res?.error];
            setErrors(errors);
            return;
        } else {
            setErrors([]);
            history.push(`/${workspaceId}`);
        }
    })

  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    // setAddForm(false);
    history.push('/')
  };

  return (
    <section className="create-channel-form-container">
      <div className="create-channel-form-header">Editing Channel</div>
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
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditChannel;
