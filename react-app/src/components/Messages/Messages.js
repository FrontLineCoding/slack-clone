import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteSelectedMessage, fetchMessages, updateMessage } from "../../store/messages";
import CreateMessage from "./CreateMessage";
import SingleMessage from "./SingleMessage";
import more from '../../svgFiles/more.svg'
import './Messages.css'

const Messages = () => {
    const dispatch = useDispatch();
    const {workspaceId, channelId} = useParams();
    const messages = useSelector(state => state.messages);
    const userWorkspaces = useSelector(state => state.workspaces.current.members);
    const userId = useSelector(state => state.session.user.id)
    const messageArr = Object.values(messages);
    const [menu, setShowMenu] = useState(true);
    const [edit, setEdit] = useState(false)


    let users = [];
    for(let i = 0; i < userWorkspaces?.length; i++){
        // console.log('laskujdhf' ,userWorkspaces[i].members.first_name);
        users.push(userWorkspaces[i].members)
        // console.log(users);
    }


    useEffect(() => {
        dispatch(fetchMessages(channelId))
    }, [dispatch, channelId]);



    return(
        <div className="message-component">
            <div className="work-space-users">
                {users?.map((user) => {
                    return (
                        <div className="user">
                            {user.first_name[0]}
                            {user.last_name[0]}
                        </div>
                    )
                })}
            </div>

            <div className="all-message-list">
                {messageArr.map(message => {
                    return <SingleMessage message={message} users={users} key={message.id}/>
                })}
            </div>
            <section className="create-messages-div">
                <CreateMessage/>
            </section>
        </div>
    )
}

export default Messages;
