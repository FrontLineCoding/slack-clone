export const GET_COMMENTS = 'comments/GET_COMMENTS';
export const ADD_COMMENTS = 'comments/ADD_COMMENTS';
export const EDIT_COMMENTS = 'comments/EDIT_COMMENTS';
export const DELETE_COMMENTS = 'comments/DELETE_COMMENTS';
export const CLEAR_COMMENTS = 'comments/CLEAR_COMMENTS';

const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments,
  };
};

const addComments = (comments) => {
  return {
    type: ADD_COMMENTS,
    comments,
  };
};

const editComments = (comments) => {
  return {
    type: EDIT_COMMENTS,
    comments,
  };
};

const deleteComments = (commentId) => {
  return {
    type: DELETE_COMMENTS,
    commentId,
  };
};

const clearComments = () => {
  return {
    type: CLEAR_COMMENTS,
  };
};

export const fetchComments = (messageId) => async (dispatch) => {
  const res = await fetch(`/api/comments/messages/${messageId}`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getComments(data.comments));
  } else {
    // if response status code is 400 or greater, throw the response as an error
    throw res;
  }
};

export const createNewComment = (messageId, comment) => async (dispatch) => {
  const res = await fetch(`/api/comments/messages/${messageId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  });
  if (res.ok) {
    const newComment = await res.json();
    dispatch(addComments(newComment));
  }
  return res;
};

export const updateComment = (commentId, comment) => async (dispatch) => {
  const res = await fetch(`/api/${commentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  });

  if (res.ok) {
    const updatedComment = await res.json();
    dispatch(editComments(updatedComment));
  }
  return res;
};

export const deleteSelectedComments = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/${commentId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(deleteComments(commentId));
  }
  return res;
};

export const clearAllComments = () => async (dispatch) => {
  dispatch(clearComments());
};

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  let newState = { ...initialState };
  switch (action.type) {
    case GET_COMMENTS:
      // newState = {...state};
      action.comments.forEach((comment) => {
        newState[comment.id] = comment;
      });
      return newState;
    case ADD_COMMENTS:
      newState = { ...state };
      newState[action.comment.id] = action.comment;
      return newState;
    case EDIT_COMMENTS:
      newState = { ...state };
      newState[action.comment.id] = action.comment;
      return newState;
    case DELETE_COMMENTS:
      newState = { ...state };
      delete newState[action.commentId];
      return newState;
    case CLEAR_COMMENTS:
      newState = {};
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
