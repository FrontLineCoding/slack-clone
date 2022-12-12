import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { fetchUsers } from '../../store/users';
import { deleteAWorkspace, getJoinedWorkspaces, getOwnedWorkspaces, getWorkspaceById, getWorkspaces } from '../../store/workspace';
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

//TODO: still rending based off all workspaces not joined/owned
const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(state => state.session.user.id)
  const workspaces = useSelector(state => state.workspaces);
  const currentWorkspaceName = useSelector(state => state.workspaces.current.name)
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const workspacesArr = Object.values(workspaces.allWorkspaces);
  const userWorkspaces = useSelector(state => state.workspaces.current.members)

  const [currentWorkspace, setCurrentWorkspace] = useState('');
  const [showWorkspaces, setShowWorkspaces] = useState(false);
  const channels = useSelector(state => state.workspaces.current.channels);
  const [addChannel, setChannelAdd] = useState(false)
  const isOwned = currentWorkspace?.ownerId === userId;


  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteAWorkspace(currentWorkspace.id));
    setCurrentWorkspace(workspacesArr[0])
    history.push('/');
  };



  useEffect(async () => {
    await dispatch(getWorkspaces());
    await dispatch(getJoinedWorkspaces());
    await dispatch(getOwnedWorkspaces());
  }, [dispatch, showWorkspaces, editForm, currentWorkspace]);


  let users = [];
  for(let i = 0; i < userWorkspaces?.length; i++){
      users.push(userWorkspaces[i].members)
  }



  useEffect(async () => {
    if(!currentWorkspaceName){
      setCurrentWorkspace(workspacesArr[0])
    }
  }, [workspaces]);

  useEffect(() => {
    if(currentWorkspace){
      dispatch(getWorkspaceById(currentWorkspace?.id))
      dispatch(getChannels(currentWorkspace?.id))
    }
  }, [currentWorkspace, editForm])

  useEffect(() => {
    dispatch(fetchUsers());
  },[dispatch])


  const handleChannelAdd = () => {
    setChannelAdd(true);
  }


  return (
    <main>
      <nav className='main-nav'>
        <div className='current' onClick={(e) => {e.preventDefault()}}>
          <div className='current-workspace' onClick={(e)=>{e.preventDefault(); setShowWorkspaces(!showWorkspaces)}}>
            {/* TODO Currently not rerendering unless page reloads */}
            {currentWorkspaceName ? currentWorkspaceName : ""}
            <img src={dropDown}></img>
          </div>
            {isOwned && <img src={cancel} onClick={(e) => {handleDelete(e)}}></img>}
            {isOwned && <img src={edit} onClick={(e) => {setEditForm(true);}}></img>}
        </div>


        {showWorkspaces &&
        <div className='list-workspaces'>
          {showWorkspaces && workspacesArr.map((workspace) => {
            return (
              <NavLink key={workspace.id}  to={`/${workspace.id}`}
              onClick={()=> {setCurrentWorkspace(workspace); setShowWorkspaces(false)}}>
                {workspace.name}
              </NavLink>
            )
          })}
          <div className='add-workspace'
            onClick={() => {
              setShowForm(true);
              setShowWorkspaces(false);

              }}>
            <img src={add}></img> Add Workspace
          </div>

        </div>
        }
        <div className='seperator'>----------</div>
        <Channels setCurrentWorkspace={setCurrentWorkspace}/>

      </nav>
      {showForm && <CreateWorkspaceModal hideForm={() => setShowForm(false)}/>}
      {editForm && <EditWorkspaceModal  setEditForm={setEditForm} workspaceId={currentWorkspace.id} workspace={currentWorkspace} setCurrentWorkspace={setCurrentWorkspace}/>}
    </main>
  );
}

export default NavBar;
