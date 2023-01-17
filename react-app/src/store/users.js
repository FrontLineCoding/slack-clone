export const GET_USERS = 'users/GET_USERS';
export const ADD_USER_WORKSPACE = 'users/ADD_USER_WORKSPACE';

const getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

export const fetchUsers = () => async (dispatch) => {
  const res = await fetch(`/api/users/`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getUsers(data.users));
  } else {
    // if response status code is 400 or greater, throw the response as an error
    throw res;
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    body: userData,
  });
};

export const addUserToWorkspace = (userId, workspaceId) => async (dispatch) => {
  const res = await fetch(`/api/workspacemembers/${userId}/${workspaceId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, workspaceId }),
  });
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
  let newState = { ...initialState };
  switch (action.type) {
    case GET_USERS:
      newState = { ...state };
      action.users.forEach((user) => {
        // newState[user.id] = [user.username, user.user_profile_img];
        newState[user.id] = user;
      });
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
