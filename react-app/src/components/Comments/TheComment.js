import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import more from '../../svgFiles/more.svg';

import './Comments.css';

const TheComment = ({ comment }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const isOwned = currentUser.id === comment.user_id;

  return (
    <div className="the-comment">
      <div key={comment?.id} className="main-comment-holder">
        <div className="user-id-name-content">
          {comment?.user?.img ? (
            <img className="comment-user-photo" src={comment?.user?.img}></img>
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
        {comment.user_id === currentUser.id && (
          <div className="more-options hide">more</div>
        )}
      </div>
      {isOwned && <img src={more} className="more" />}
    </div>
  );
};

export default TheComment;
