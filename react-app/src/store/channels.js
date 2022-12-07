const LOAD_ALL = "channels/LOAD";
const ADD = "channels/ADD";
const EDIT = "channels/EDIT";
const DELETE = "channels/DELETE";

const loadChannels = (channels) => ({
  type: LOAD_ALL,
  channels,
});

const add = (channel) => ({
  type: ADD,
  channel,
});

const edit = (channel) => ({
  type: EDIT,
  channel,
});

const deleteChannel = (channel) => ({
  type: DELETE,
  channel,
});

export const getChannels = (workspaceId) => async (dispatch) => {
  const response = await fetch(`/api/channels/workspaces/${workspaceId}`);

  if (response.ok) {
    const channels = await response.json();
    // const WorkspaceChannels = channels.channels;
    dispatch(loadChannels(channels));
  }
};

export const addChannel = (workspaceId, payload) => async (dispatch) => {
  const response = await fetch(`/api/channels/workspaces/${workspaceId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!data.error) {
    await dispatch(add(data));
    return data;
  }
  return data;
};

export const editChannel =
  (channelId, workspaceId, payload) => async (dispatch) => {
    const response = await fetch(
      `/api/channels/${channelId}/workspaces/${workspaceId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    if (!data.error) {
      dispatch(edit(data));
      return data;
    }
    return data;
  };

export const deleteChannelThunk = (channel, workspaceId) => async (dispatch) => {
  const response = await fetch(
    `/api/channels/${channel.id}/workspaces/${workspaceId}`,
    {
      method: "DELETE",
    }
  );

  if (response.ok) {
    dispatch(deleteChannel(channel));
  }
};

const initialState = {};

const channelReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_ALL:
      const channels = {};
      action.channels.forEach((channel) => {
        channels[channel.id] = channel;
      });
      return channels;
    case ADD:
      const { channel } = action;
      newState[channel.id] = channel;
      return newState;
    case EDIT:
      newState[action.channel.id] = action.channel;
      return newState;
    case DELETE:
      delete newState[action.channel.id];
      return newState;
    default:
      return state;
  }
};

export default channelReducer;
