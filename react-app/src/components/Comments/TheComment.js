import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSelectedComments, updateComment } from '../../store/comments';
import more from '../../svgFiles/more.svg';

import './Comments.css';

const TheComment = ({ comment }) => {
  console.log(comment);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const isOwned = currentUser.id === comment?.user_id;
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [viewMode, setViewMode] = useState(true);

  const handleMoreOptions = (e) => {
    if (e.innerText === 'Edit') {
      setViewMode(false);
    } else if (e.innerText == 'Delete') {
      dispatch(deleteSelectedComments(comment.id));
      setShowMoreOptions(!showMoreOptions);
    } else {
    }
  };

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
      </div>
      {isOwned && !showMoreOptions && (
        <img
          src={more}
          className="more hidden"
          onClick={() => {
            setShowMoreOptions(true);
          }}
        />
      )}
      {showMoreOptions && (
        <div
          className="comment-options"
          onMouseLeave={() => {
            setShowMoreOptions(false);
          }}
          onClick={(e) => {
            handleMoreOptions(e.target);
          }}
        >
          <ul>
            <li>Edit</li>
            <li>Delete</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TheComment;
