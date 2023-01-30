import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { deleteChannelThunk } from '../../store/channels';
import { getWorkspaceById } from '../../store/workspace';
import add from '../../svgFiles/add.svg';
import cancel from '../../svgFiles/cancel.svg';
import edit from '../../svgFiles/edit.svg';
import './Channels.css';
import CreateChannelModal from './CreateChannelModal';
import EditChannelModal from './EditChannelModal';

const Channels = ({ prevWorkspace }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentWorkspace = useSelector((state) => state.workspaces.current);
  const channels = useSelector((state) => state.channels);
  const channelsArr = Object.values(channels);
  const user = useSelector((state) => state.session.user);
  const isOwned = currentWorkspace?.ownerId === user.id;
  const [currentchannel, setCurrentChannel] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const deleteChannel = (channelId) => {
    let channel = channelsArr.filter((el) => {
      return el.id === parseInt(channelId);
    });
    dispatch(deleteChannelThunk(channel[0], currentWorkspace?.id));
  };

  const handleChannelEditClick = (channelId) => {
    setShowEdit(true);
    history.push(`/${currentWorkspace.id}/${channelId}`);
  };

  useEffect(() => {
    dispatch(getWorkspaceById(currentWorkspace?.id));
  }, [showModal]);

  useEffect(() => {
    if (prevWorkspace) {
      const removeActiveStatus = document.getElementById(prevWorkspace.id);
      removeActiveStatus.className = 'workspace-in-workspace-list';
    }
    if (currentWorkspace) {
      const addActiveStatus = document.getElementById(currentWorkspace.id);
      if (addActiveStatus) {
        addActiveStatus.className =
          'workspace-in-workspace-list workspace-active';
      }
      console.log(addActiveStatus);
    }

    return () => {
      const cleanUpActiveStatus = document.getElementById(currentWorkspace.id);
      if (cleanUpActiveStatus) {
        cleanUpActiveStatus.className = 'workspace-in-workspace-list';
      }
    };
  }, [currentchannel, currentWorkspace]);

  return (
    <div className="channels">
      <div className="show-channels">
        Channels
        {/* {isOwned && <NavLink key='add-channel' to='/add-channel'><img src={add} className='channel-add'></img></NavLink>} */}
        {isOwned && (
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            <img src={add} className="channel-add" alt="add svg file"></img>
          </button>
        )}
        {showModal && <CreateChannelModal setShowModal={setShowModal} />}
        {showEdit && <EditChannelModal setShowEdit={setShowEdit} />}
      </div>

      {channelsArr?.map((channel) => {
        return (
          <div className={`single-channel`}>
            <NavLink
              key={`${channel.id}`}
              to={`/${currentWorkspace.id}/${channel.id}`}
              activeClassName="channel-active"
              onClick={() => {
                setCurrentChannel(channel);
              }}
            >
              {channel.name}
            </NavLink>
            {isOwned && (
              <div className="options hide">
                <img
                  src={cancel}
                  className={`${channel.id}`}
                  onClick={(e) => {
                    deleteChannel(channel.id);
                  }}
                  alt="hide options"
                ></img>
                <img
                  src={edit}
                  className="channel-edit"
                  onClick={(e) => handleChannelEditClick(channel.id)}
                  alt="hide options"
                ></img>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Channels;
