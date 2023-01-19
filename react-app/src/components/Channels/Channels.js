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

const Channels = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentWorkspace = useSelector((state) => state.workspaces.current);
  const channels = useSelector((state) => state.channels);
  const channelsArr = Object.values(channels);
  const user = useSelector((state) => state.session.user);
  const isOwned = currentWorkspace?.ownerId === user.id;
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
        {/* TODO setting up modal for channel creation. currently prop threading */}
        {showModal && <CreateChannelModal setShowModal={setShowModal} />}
        {showEdit && <EditChannelModal setShowEdit={setShowEdit} />}
      </div>

      {channelsArr?.map((channel) => {
        return (
          <div className={`single-channel`}>
            <NavLink
              key={`${channel.id}`}
              to={`/${currentWorkspace.id}/${channel.id}`}
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
