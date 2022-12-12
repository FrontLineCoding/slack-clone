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
import CreateChannel from './CreateChannel';

// TODO maybe delete if channels works
const Workspaces = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const channelsArr = Object.values(channels)
    const userId = useSelector(state => state.session.user.id)
    const workspaces = useSelector(state => state.workspaces);
    const joinedWorkspaces = Object.values(workspaces.joined);
    const ownedWorkspaces = Object.values(workspaces.owned);
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const workspacesArr = Object.values(workspaces.allWorkspaces);
    const userWorkspaces = useSelector(state => state.workspaces.current.members)

    // const workspacesArr = [...joinedWorkspaces,...ownedWorkspaces]

    const [currentWorkspace, setCurrentWorkspace] = useState('');
    const [showWorkspaces, setShowWorkspaces] = useState(false);
    const channels = useSelector(state => state.workspaces.current.channels);
    const [addChannel, setChannelAdd] = useState(false)
    const isOwned = currentWorkspace?.ownerId === userId;


}
