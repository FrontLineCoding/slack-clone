import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  deleteSelectedMessage,
  fetchMessages,
  updateMessage,
} from '../../store/messages';
import CreateMessage from './CreateMessage';
import SingleMessage from './SingleMessage';
import more from '../../svgFiles/more.svg';
import add from '../../svgFiles/add.svg';
import './Messages.css';
import ShowUsersModal from '../Users/ShowUsersModal';
import { fetchUsers } from '../../store/users';

const Messages = () => {
  const dispatch = useDispatch();
  const { workspaceId, channelId } = useParams();
  const messages = useSelector((state) => state.messages);
  const userWorkspaces = useSelector(
    (state) => state.workspaces.current.members
  );
  const userId = useSelector((state) => state.session.user.id);
  const messageArr = Object.values(messages);
  const [menu, setShowMenu] = useState(true);
  const [edit, setEdit] = useState(false);
  const [showUserSearch, setShowUserSearch] = useState(false);

  let users = [];
  for (let i = 0; i < userWorkspaces?.length; i++) {
    users.push(userWorkspaces[i].members);
  }

  useEffect(() => {
    dispatch(fetchMessages(channelId));
  }, [dispatch, channelId]);

  const handleAddUser = () => {
    setShowUserSearch(true);
  };

  return (
    <div className="message-component">
      <div className="upper-div">
        <div className="work-space-users">
          <img
            src={add}
            className="add-user-to-workspace"
            onClick={handleAddUser}
          />
          {users?.map((user) => {
            return user?.img ? (
              <div className={`workspace-user-pic`}>
                <img src={`${user?.img}`} />
              </div>
            ) : (
              <div className="workspace-no-picture">
                {user?.first_name[0]}
                {user?.last_name[0]}
              </div>
            );
          })}
        </div>
        <div className="all-message-list">
          {messageArr.map((message) => {
            return (
              <SingleMessage message={message} users={users} key={message.id} />
            );
          })}
        </div>
      </div>
      <section className="create-messages-div">
        <CreateMessage />
      </section>
      {showUserSearch && (
        <ShowUsersModal
          setShowUserSearch={setShowUserSearch}
          currentMembers={users}
        ></ShowUsersModal>
      )}
    </div>
  );
};

export default Messages;
