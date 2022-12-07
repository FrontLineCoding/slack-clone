import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteChannelThunk } from '../../store/channels';
import add from '../../svgFiles/add.svg'
import cancel from '../../svgFiles/cancel.svg'
import edit from '../../svgFiles/edit.svg'
import './Channels.css'
import CreateChannelModal from './CreateChannelModal';


const Channels = () => {
    const dispatch = useDispatch();
    const currentWorkspace = useSelector(state => state.workspaces.current);
    const user = useSelector(state => state.session.user);
    const isOwned = currentWorkspace?.ownerId === user.id;
    const [addForm, setAddForm] = useState(false);
    const [showModal, setShowModal] = useState(false);


    // let channel;
    const deleteChannel = (channelId) => {
        let channel = currentWorkspace.channels.map((el) => {
            if (el.id == parseInt(channelId)){
                return el
            }
        })
        dispatch(deleteChannelThunk(channel[0], currentWorkspace?.id));
    }


    return (
        <div className='channels'>
            <div className='show-channels'>
                Channels
                {/* {isOwned && <NavLink key='add-channel' to='/add-channel'><img src={add} className='channel-add'></img></NavLink>} */}
                {isOwned && <button onClick={(() => {setShowModal(true)})}></button>}
                {/* TODO setting up modal for channel creation. currently prop threading */}
                {showModal && <CreateChannelModal  setShowModal={setShowModal} />}
            </div>


            {currentWorkspace?.channels?.map(channel => {
                return (
                    <div className={`single-channel`}>
                        <NavLink key={`${channel.id}`} to={`/${currentWorkspace.id}/${channel.id}`}>
                            {channel.name}
                        </NavLink>
                        {isOwned && <img src={cancel} className={`${channel.id} hide`} onClick={(e) => {console.log(channel.id); deleteChannel(e.target.className)}}></img>}
                        {isOwned && <NavLink key='edit-channel' to={`/edit-channel/${channel.id}`}><img src={edit} className='channel-edit hide'></img></NavLink>}
                    </div>
                )
            })}

        </div>
    )
}

export default Channels;
