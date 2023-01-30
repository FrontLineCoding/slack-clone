import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createNewComment } from '../../store/comments';
import './Comments.css';

const CreateComment = ({ commentCreated, setCommentCreated }) => {
  const dispatch = useDispatch();
  const { messageId } = useParams();
  const [commentContent, setCommentContent] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentContent.replaceAll(' ', '').length === 0) {
      setErrors(['Channel name cannot be empty']);
      return;
    }

    const newComment = {
      content: commentContent,
    };
    await dispatch(createNewComment(messageId, newComment)).then((res) => {
      if (res?.error) {
        let errors = [res?.errors];
        setErrors(errors);
        setCommentCreated(!commentCreated);
        return;
      } else {
        setCommentContent('');
        setCommentCreated(!commentCreated);
        setErrors([]);
      }
    });
  };

  return (
    <div className="create-messages-div">
      <form className="create-message-form" onSubmit={handleSubmit}>
        <input
          className="message-content"
          type="text"
          value={commentContent}
          onChange={(e) => {
            setCommentContent(e.target.value);
          }}
          placeholder="Type Away"
          required
        />
        <button className="create-message-button hide" type="submit"></button>
      </form>
    </div>
  );
};

export default CreateComment;
