import { useSelector } from 'react-redux';

const SingleComment = ({ users }) => {
  const commentsState = useSelector((state) => state.comments);
  const comments = Object.values(commentsState);
  console.log(comments);

  return (
    <div>
      {comments.map((comment) => {
        return <div>{comment.content}</div>;
      })}
    </div>
  );
};

export default SingleComment;
