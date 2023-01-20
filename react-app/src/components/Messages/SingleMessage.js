import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import more from '../../svgFiles/more.svg';
import cancel from '../../svgFiles/cancel.svg';
import { deleteSelectedMessage, updateMessage } from '../../store/messages';

import './Messages.css';
import { NavLink, useParams } from 'react-router-dom';
import Comments from '../Comments/Comments';

const SingleMessage = ({ message, users }) => {
  const dispatch = useDispatch();
  const [menu, setShowMenu] = useState(true);
  const [viewMode, setViewMode] = useState(true);
  const userId = useSelector((state) => state.session.user.id);
  const { workspaceId, channelId } = useParams();
  const workspaceUsers = useSelector(
    (state) => state.workspaces.current.members
  );
  const isOwned = message.user_id === userId;
  const user = users.find((user) => user.id === message.user_id);
  const [messageContent, setMessageContent] = useState(message.content);

  const handleMoreOptions = (e, message) => {
    const action = e.target.innerText;
    if (message.user_id != userId) {
      setShowMenu(true);
      return { Message: "This ain't yers" };
    } else if (action === 'Edit') {
      setShowMenu(true);
      setViewMode(false);
    } else {
      dispatch(deleteSelectedMessage(message.id));
      setShowMenu(true);
    }

    // choices.className = "more-options-menu hide";
  };

  const handleCancel = (e) => {
    setViewMode(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    message.content = messageContent;
    dispatch(updateMessage(message));
    setViewMode(true);
  };

  const regular = (
    <div className="single-message">
      <div className="inner-message">
        <div className="individual-message-info">
          {user?.img ? (
            <div
              className={`message-user-pic`}
              //   style={{ backgroundImage: `url(${user?.img})` }}
            >
              <img src={`${user?.img}`} />
            </div>
          ) : (
            <div className="no-picture">
              {user?.first_name[0]}
              {user?.last_name[0]}
            </div>
          )}
        </div>
        <div className="individual-message">
          <div className="name">
            {user?.first_name} {user?.last_name}
          </div>
          {message.content}
          <div className="comments-link-div">
            <NavLink
              className={`comment-link`}
              to={`/${workspaceId}/${channelId}/${message.id}`}
            >
              replies
            </NavLink>
          </div>
        </div>
      </div>

      {menu ? (
        isOwned && (
          <img
            id={`more-options-img-${message.id}`}
            className={`more-options-div hide`}
            src={more}
            onClick={(e) => {
              setShowMenu(false);
            }}
          ></img>
        )
      ) : (
        <div id={`${message.id}`} className={`more-options-menu`}>
          <ul
            onMouseLeave={() => {
              setShowMenu(true);
            }}
            onClick={(e) => {
              handleMoreOptions(e, message);
            }}
          >
            {isOwned && <li>Edit</li>}
            {isOwned && <li>Delete</li>}
            {/* TODO add the reply functionalilty after making the Comments component  */}
            {/* <li>Reply</li> */}
          </ul>
        </div>
      )}
    </div>
  );

  const edit = (
    <div className="single-message">
      <div className="inner-message">
        <div className="individual-message-info">
          {user?.first_name[0]}
          {user?.last_name[0]}
        </div>
        <div className="individual-message">
          <div className="name">
            {user?.first_name} {user?.last_name}
          </div>
          <form className="edit-message-form" onSubmit={handleSubmit}>
            <input
              className="message-edit-input"
              type="text"
              name="message"
              defaultValue={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              required
            />
            <div className="cancel">
              <img
                src={cancel}
                onClick={(e) => {
                  handleCancel();
                }}
              />
            </div>
          </form>
        </div>
      </div>
      {menu ? (
        <img
          id={`more-options-img-${message.id}`}
          className={`more-options-div hide`}
          src={more}
          onClick={(e) => {
            setShowMenu(false);
          }}
        ></img>
      ) : (
        <div id={`${message.id}`} className={`more-options-menu`}>
          <ul
            onClick={(e) => {
              handleMoreOptions(e, message);
            }}
          >
            <li>Edit</li>
            <li>Delete</li>
          </ul>
        </div>
      )}
    </div>
  );

  return viewMode ? regular : edit;
};

export default SingleMessage;
