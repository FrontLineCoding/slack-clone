import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { fetchUsers } from '../../store/users';
import {
  deleteAWorkspace,
  getJoinedWorkspaces,
  getOwnedWorkspaces,
  getWorkspaceById,
  getWorkspaces,
} from '../../store/workspace';
import dropDown from '../../svgFiles/drop-down.svg';
import add from '../../svgFiles/add.svg';
import edit from '../../svgFiles/edit.svg';
import cancel from '../../svgFiles/cancel.svg';
import './Nav.css';
import CreateWorkspaceForm from './CreateWorkspaceForm';
import EditWorkspaceForm from './EditWorkspaceForm';
import CreateChannel from '../Channels/CreateChannel';
import Channels from '../Channels/Channels';
import CreateWorkspaceModal from '../Workspaces/CreateWorkspaceModal';
import EditWorkspaceModal from '../Workspaces/EditWorkspaceModal';
import { getChannels } from '../../store/channels';
import { authenticate } from '../../store/session';

const NavBar = ({ joinedWorkspaces }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);
  const workspaces = useSelector((state) => state.workspaces);
  const currentWorkspaceName = useSelector(
    (state) => state.workspaces.current.name
  );
  const ownedWorkspacesState = useSelector((state) => state.workspaces.owned);
  const ownedWorkspaces = Object.values(ownedWorkspacesState);
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const workspaceUsers = useSelector(
    (state) => state.workspaces.current.members
  );

  const [currentWorkspace, setCurrentWorkspace] = useState(
    joinedWorkspaces[0].workspace
  );
  const [showWorkspaceOptions, setShowWorkspaceOptions] = useState(false);
  const channels = useSelector((state) => state.workspaces.current.channels);
  const [addChannel, setChannelAdd] = useState(false);
  const isOwned = currentWorkspace?.ownerId === userId;

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteAWorkspace(currentWorkspace.id));
    dispatch(getJoinedWorkspaces());
    dispatch(authenticate());
    setCurrentWorkspace(joinedWorkspaces[0].workspace);
    history.push('/');
  };

  useEffect(async () => {
    // await dispatch(getWorkspaces());
    dispatch(authenticate());
    await dispatch(getJoinedWorkspaces());
    // await dispatch(getOwnedWorkspaces());
  }, [dispatch, editForm, currentWorkspace, addChannel]);

  let users = [];
  for (let i = 0; i < workspaceUsers?.length; i++) {
    users.push(workspaceUsers[i].members);
  }

  useEffect(async () => {
    if (!currentWorkspaceName) {
      setCurrentWorkspace(joinedWorkspaces[0].workspace);
    }
  }, [workspaces]);

  useEffect(() => {
    if (currentWorkspace) {
      dispatch(getWorkspaceById(currentWorkspace?.id));
      dispatch(getChannels(currentWorkspace?.id));
    }
  }, [currentWorkspace, editForm]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChannelAdd = () => {
    setChannelAdd(!addChannel);
  };
  //TODO: amke the edit and delete functions a drop down, not floating
  return (
    <main className="main-workspace-container">
      <div className="workspace-nav">
        {joinedWorkspaces.map((workspace) => {
          return (
            <div
              className="workspace-in-workspace-list"
              onClick={() => {
                history.push(
                  `/${workspace.workspace.id}/${workspace.workspace.channels[0].id}`
                );
                setCurrentWorkspace(workspace.workspace);
              }}
            >
              {workspace.workspace.img ? (
                <img src={workspace.workspace.img}></img>
              ) : (
                <div>no photos</div>
              )}
            </div>
          );
        })}
        <div
          className="workspace-in-workspace-list add-workspace"
          onClick={() => {
            setShowForm(true);
          }}
        >
          <img src={add}></img>
        </div>
      </div>
      <nav className="main-nav">
        <div
          className="current"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <div
            className="current-workspace"
            onClick={(e) => {
              // e.preventDefault();
              setShowWorkspaceOptions(!showWorkspaceOptions);
            }}
          >
            {currentWorkspaceName ? currentWorkspaceName : ''}
            <img src={dropDown}></img>
          </div>
          {isOwned && (
            <img
              src={cancel}
              onClick={(e) => {
                handleDelete(e);
              }}
            ></img>
          )}
          {isOwned && (
            <img
              src={edit}
              onClick={(e) => {
                setEditForm(true);
              }}
            ></img>
          )}
        </div>

        <div className="seperator">----------</div>
        <Channels setCurrentWorkspace={setCurrentWorkspace} />
      </nav>
      {showForm && (
        <CreateWorkspaceModal
          hideForm={() => setShowForm(false)}
          setChannelAdd={setChannelAdd}
          addChannel={addChannel}
        />
      )}
      {editForm && (
        <EditWorkspaceModal
          setEditForm={setEditForm}
          workspaceId={currentWorkspace.id}
          workspace={currentWorkspace}
          setCurrentWorkspace={setCurrentWorkspace}
        />
      )}
    </main>
  );
};

export default NavBar;
