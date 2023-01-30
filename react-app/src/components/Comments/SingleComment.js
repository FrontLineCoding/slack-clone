import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../../store/comments';

import './Comments.css';

const SingleComment = ({ users, commentCreated }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch, commentCreated]);

  const commentsState = useSelector((state) => state.comments);
  for (let prop in commentsState) {
    for (let i = 0; i < users.length; i++) {
      if (commentsState[prop]?.user_id === users[i].id) {
        commentsState[prop].user = { ...users[i] };
      }
    }
  }

  const comments = Object.values(commentsState);

  return (
    <div>
      {comments.map((comment) => {
        return (
          <div key={comment?.id} className="main-comment-holder">
            {comment?.user?.img ? (
              <img
                className="comment-user-photo"
                src={comment?.user?.img}
              ></img>
            ) : (
              <div className="comment-user-initials">
                {comment?.user?.first_name[0]}
                {comment?.user?.last_name[0]}
              </div>
            )}

            <div className="comment-name-and-content-holder">
              <div className="comment-name">
                {comment?.user?.first_name} {comment?.user?.last_name}
              </div>
              <div className="comment-content">{comment?.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SingleComment;
