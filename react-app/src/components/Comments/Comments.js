import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchComments } from '../../store/comments';
import SingleComment from './SingleComment';
import './Comments.css';
import CreateComment from './CreateComment';

const Comments = () => {
  const dispatch = useDispatch();
  const { messageId } = useParams();
  const [commentCreated, setCommentCreated] = useState(false);
  const messageState = useSelector((state) => state.messages);
  const workspaceUsersState = useSelector(
    (state) => state.workspaces.current.members
  );
  const workspaceUsers = workspaceUsersState.map((obj) => obj.members);
  let displayMessage;
  useEffect(() => {
    dispatch(fetchComments(messageId));
  }, [messageId, commentCreated, dispatch]);

  for (let property in messageState) {
    if (property === messageId) {
      displayMessage = messageState[property];
    }
  }
  const messageOwner = workspaceUsers.filter((user) => {
    if (user.id === displayMessage.user_id) {
      return user;
    } else {
      return;
    }
  });

  return (
    <div className="comments-main-container">
      <div>
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
        <div className="seperator"></div>
        {/* //TODO return mapping of comments instead of mapping through them in the single comment */}
        <div className="single-comment">
          <SingleComment
            users={workspaceUsers}
            commentCreated={commentCreated}
          ></SingleComment>
        </div>
      </div>
      <div className="create-comment">
        <CreateComment
          commentCreated={commentCreated}
          setCommentCreated={setCommentCreated}
        />
      </div>
    </div>
  );
};

export default Comments;
