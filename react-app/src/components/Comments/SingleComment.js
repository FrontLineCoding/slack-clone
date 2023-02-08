import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../../store/comments';
import more from '../../svgFiles/more.svg';
import './Comments.css';
import TheComment from './TheComment';

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
  const currentUser = useSelector((state) => state.session.user);

  return (
    <div className="all-comments">
      {comments?.map((comment) => {
        return <TheComment comment={comment} />;
      })}
    </div>
  );
};

export default SingleComment;
