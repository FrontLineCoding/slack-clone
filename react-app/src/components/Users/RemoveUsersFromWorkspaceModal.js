import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserFromWorkspace } from '../../store/users';
import { Modal } from '../../context/Modal';
import './ShowUsersModal.css';
import { getWorkspaceById } from '../../store/workspace';

const RemoveUsersFromWorkspaceModal = ({
  setShowRemoveUser,
  currentMembers,
}) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const currentWorkspace = useSelector((state) => state.workspaces.current);
  const currentMembersIds = currentMembers.map(
    (currentMember) => currentMember.id
  );

  const handleUserRemoval = (user) => {
    if (
      currentMembersIds.find((currentMemberId) => currentMemberId === user.id)
    ) {
      dispatch(removeUserFromWorkspace(user.id, currentWorkspace?.id));
    }
    dispatch(getWorkspaceById(currentWorkspace?.id));
    setShowRemoveUser(false);
  };

  return (
    <div className="usersearch-modal">
      <Modal onClose={() => setShowModal(false)} showModal={showModal}>
        <div className="usersearch-instructions">
          Click a User to Remove From Workspace
        </div>
        <div className="usersearch-seperator"></div>
        {currentMembers.map((user) => {
          return (
            <div
              className="usersearch-individual-user"
              key={user?.id}
              onClick={() => {
                handleUserRemoval(user);
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
            setShowRemoveUser(false);
          }}
          className="usersearch-close-button"
        >
          Close
        </div>
      </Modal>
    </div>
  );
};

export default RemoveUsersFromWorkspaceModal;
