const LOAD_ALL = 'workspaces/LOAD_ALL';
const LOAD_ONE = 'workspaces/LOAD_ONE';
const OWNED = 'workspaces/OWNED';
const JOINED = 'workspaces/JOINED';
const EDIT = 'workspaces/EDIT';
const ADD = 'workspaces/ADD';
const DELETE = 'workspaces/DELETE';

const loadAllWorkspaces = (allWorkspaces) => ({
  type: LOAD_ALL,
  allWorkspaces,
});

const loadOneWorkspace = (current) => ({
  type: LOAD_ONE,
  current,
});

const loadOwnedWorkspaces = (ownedWorkspaces) => ({
  type: OWNED,
  ownedWorkspaces,
});

const loadJoinedWorkspaces = (joinedWorkspaces) => ({
  type: JOINED,
  joinedWorkspaces,
});

const edit = (workspace) => ({
  type: EDIT,
  workspace,
});

const add = (workspace) => ({
  type: ADD,
  workspace,
});

const deleteWorkspace = (id) => ({
  type: DELETE,
  id,
});

export const getWorkspaces = () => async (dispatch) => {
  const response = await fetch(`/api/workspaces/`);

  if (response.ok) {
    const allWorkspaces = await response.json();
    dispatch(loadAllWorkspaces(allWorkspaces));
  }
};
export const getJoinedWorkspaces = () => async (dispatch) => {
  const promise = await fetch('/api/workspaces/me');
  if (promise.ok) {
    const joinedWorkspaces = await promise.json();
    dispatch(loadJoinedWorkspaces(joinedWorkspaces));
  }
};
export const getOwnedWorkspaces = () => async (dispatch) => {
  const promise = await fetch('/api/workspaces/owned');
  if (promise.ok) {
    const joinedWorkspaces = await promise.json();
    dispatch(loadOwnedWorkspaces(joinedWorkspaces));
  }
};

export const getWorkspaceById = (id) => async (dispatch) => {
  const response = await fetch(`/api/workspaces/${id}`);

  if (response.ok) {
    const workspace = await response.json();
    dispatch(loadOneWorkspace(workspace));
  }
};
export const addWorkspace = (workspace) => async (dispatch) => {
  const response = await fetch(`/api/workspaces`, {
    method: 'POST',
    body: workspace,
  });

  if (response.ok) {
    const workspace = await response.json();
    dispatch(add(workspace));
    return workspace;
  }
};

export const editWorkspace = (workspace, workspaceId) => async (dispatch) => {
  const response = await fetch(`/api/workspaces/${workspaceId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(workspace),
  });

  if (response.ok) {
    const workspace = await response.json();
    dispatch(edit(workspace));
    return workspace;
  }
};

export const deleteAWorkspace = (workspaceId) => async (dispatch) => {
  const response = await fetch(`/api/workspaces/${workspaceId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const returnValue = response.json();
    dispatch(deleteWorkspace(workspaceId));
    return returnValue;
  }
};

const initialState = {
  owned: {},
  joined: {},
  current: {},
  allWorkspaces: {},
};

const workspaceReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case LOAD_ALL:
      const allWorkspacesLoaded = {};
      action.allWorkspaces.Workspaces.forEach((workspace) => {
        allWorkspacesLoaded[workspace.id] = workspace;
      });
      state.allWorkspaces = { ...allWorkspacesLoaded };
      return {
        ...state,
      };

    case OWNED:
      const ownedWorkspaces = {};
      action.ownedWorkspaces.OwnedWorkspaces.forEach((workspace) => {
        ownedWorkspaces[workspace.id] = workspace;
      });
      state.owned = { ...ownedWorkspaces };
      return {
        ...state,
      };

    case JOINED:
      const joinedWorkspaces = {};
      action.joinedWorkspaces.JoinedWorkspaces.forEach((workspace) => {
        joinedWorkspaces[workspace.id] = workspace;
      });
      state.joined = { ...joinedWorkspaces };
      return {
        ...state,
      };

    case LOAD_ONE:
      state.current = action.current;
      return {
        ...state,
      };

    case ADD:
      if (!state[action.workspace.id]) {
        const newState = {
          ...state,
          [action.workspace.id]: action.workspace,
        };
        return newState;
      }
      return {
        ...state,
        [action.workspace.id]: {
          ...state[action.workspace.id],
          ...action.workspace,
        },
      };
    case DELETE:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    case EDIT:
      return {
        ...state,
        [action.workspace.id]: action.workspace,
      };
    default:
      return state;
  }
};

export default workspaceReducer;
