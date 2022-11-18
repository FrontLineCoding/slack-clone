import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getWorkspaces } from '../../store/workspace';
import dropDown from '../../svgFiles/drop-down.svg'
import './Nav.css'

const NavBar = () => {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.channels);
  const workspaces = useSelector(state => state.workspaces);
  const workspacesArr = Object.values(workspaces.allWorkspaces);
  const [currentWorkspace, setCurrentWorkspace] = useState(workspacesArr[0]);
  const [showWorkspaces, setShowWorkspaces] = useState(false);

  useEffect(() => {
      dispatch(getWorkspaces());
  }, [dispatch]);


  return (
    <main>
      <nav className='main-nav'>
        {/* {console.log(currentWorkspace)} */}
        <div className='current-workspace' onClick={()=>{setShowWorkspaces(!showWorkspaces)}}>
          {currentWorkspace ? currentWorkspace.name:""}
          <img src={dropDown}></img>
        </div>

        {showWorkspaces &&
        <div className='list-workspaces'>
          {showWorkspaces && workspacesArr.map((workspace) => {
            return (
              <NavLink key={workspace.id}  to={`/`}
              onClick={()=> {setCurrentWorkspace(workspace); setShowWorkspaces(false)}}>
                {workspace.name}
              </NavLink>
            )
          })}
        </div>
        }
      </nav>
    </main>
  );
}

export default NavBar;
