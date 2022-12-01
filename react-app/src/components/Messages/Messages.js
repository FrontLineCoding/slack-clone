import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMessages } from "../../store/messages";
import './Messages.css'

const Messages = () => {
    const dispatch = useDispatch();
    const {workspaceId, channelId} = useParams();
    const messages = useSelector(state => state.messages);
    const userWorkspaces = useSelector(state => state.workspaces.current.members)
    const messageArr = Object.values(messages)


    let users = [];
    for(let i = 0; i < userWorkspaces?.length; i++){
        // console.log('laskujdhf' ,userWorkspaces[i].members.first_name);
        users.push(userWorkspaces[i].members)
        // console.log(users);
    }

    useEffect(() => {
        dispatch(fetchMessages(channelId))
    }, [dispatch, channelId]);

    return (
        <div className="message-component">
            <div className="work-space-users">
                {users?.map((user) => {
                    // console.log(user);
                    return (
                        <div className="user">
                            {user.first_name[0]}
                            {user.last_name[0]}
                        </div>
                    )
                })}
            </div>
            <div className="messages-container">
                {/* {console.log(users)} */}
                {messageArr.map((message) => {
                    let user = users?.find(el => el.id === message.user_id)
                    // console.log(user);
                    return(
                        <div id={message.id} className='message'>
                            <div className="individual-message-info">
                                {user?.first_name[0]}
                                {user?.last_name[0]}
                            </div>
                            <div className="individual-message">
                                <div className="name">
                                    {user?.first_name}
                                    {" "}
                                    {user?.last_name}
                                </div>
                                {message.content}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Messages;
