import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchComments } from '../../store/comments';
import SingleComment from './SingleComment';
import './Comments.css';

const Comments = () => {
  const dispatch = useDispatch();
  const { messageId } = useParams();
  const messageState = useSelector((state) => state.messages);
  const message = Object.values(messageState);
  console.log(message);
  const workspaceUsersState = useSelector(
    (state) => state.workspaces.current.members
  );
  const workspaceUsers = workspaceUsersState.map((obj) => obj.members);
  const messageOwner = workspaceUsers.filter((user) => {
    if (user.id === message[0].user_id) {
      return user;
    } else {
      return;
    }
  });
  let displayMessage;
  useEffect(() => {
    dispatch(fetchComments(messageId));
  }, [messageId, dispatch]);

  for (let property in messageState) {
    if (property === messageId) {
      displayMessage = messageState[property];
    }
  }

  return (
    <div className="comments-main-container">
      <div className="starter-message-div">
        <div className="message-owner">
          {messageOwner[0].img ? (
            <div>
              <img
                src={messageOwner[0].img}
                className="message-owner-picture"
                alt="the message owner's"
              ></img>
            </div>
          ) : (
            <div className="no-picture">
              {messageOwner[0]?.first_name[0]}
              {messageOwner[0]?.last_name[0]}
            </div>
          )}
        </div>
        <div className="name-content--div">
          <div>
            {messageOwner[0].first_name} {messageOwner[0].last_name}
          </div>
          <div className="message-content">{displayMessage.content}</div>
        </div>
      </div>
      <div className="single-comment">
        <SingleComment users={workspaceUsers}></SingleComment>
      </div>
    </div>
  );
};

export default Comments;
