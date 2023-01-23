import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToWorkspace, fetchUsers } from '../../store/users';
import { Modal } from '../../context/Modal';
import './ShowUsersModal.css';
import { getWorkspaceById } from '../../store/workspace';

const ShowUsersModal = ({ setShowUserSearch, currentMembers }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const currentWorkspace = useSelector((state) => state.workspaces.current);
  const users = useSelector((state) => state.users);
  const allUsers = Object.values(users);
  const currentMembersIds = currentMembers.map(
    (currentMember) => currentMember.id
  );
  const addableUsersArray = [];
  const addableUsers = allUsers.map((user) => {
    if (
      currentMembersIds.find((currentMemberId) => currentMemberId === user.id)
    ) {
      return;
    } else {
      addableUsersArray.push(user);
      return user;
    }
  });

  useEffect(() => {
    const allUsersObject = dispatch(fetchUsers());
  }, []);

  const handleUserWorkspaceInvite = (user) => {
    if (
      !currentMembersIds.find((currentMemberId) => currentMemberId === user.id)
    ) {
      dispatch(addUserToWorkspace(user.id, currentWorkspace?.id));
    }
    dispatch(getWorkspaceById(currentWorkspace?.id));
    setShowUserSearch(false);
  };

  return (
    <div className="usersearch-modal">
      <Modal onClose={() => setShowModal(false)} showModal={showModal}>
        <div className="usersearch-instructions">
          Click a User to Add to Workspace
        </div>
        <div className="usersearch-seperator"></div>
        {addableUsersArray.map((user) => {
          return (
            <div
              className="usersearch-individual-user"
              key={user?.id}
              onClick={() => {
                handleUserWorkspaceInvite(user);
              }}
            >
              {user?.img ? (
                <img src={user.img} className="usersearch-user-img" />
              ) : (
                <div className="usersearch-user-no-img">
                  {user?.first_name[0]}
                  {user?.last_name[0]}
                </div>
              )}
              <p className="usersearch-user-name">
                {user?.first_name} {user?.last_name}
              </p>
            </div>
          );
        })}
        <div
          onClick={() => {
            setShowUserSearch(false);
          }}
          className="usersearch-close-button"
        >
          Close
        </div>
      </Modal>
    </div>
  );
};

export default ShowUsersModal;
