import { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateProfileForm from './UpdateProfileForm';

const UpdateProfileModal = ({ user, hideForm }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="server-modal">
      <Modal onClose={() => setShowModal(false)} showModal={showModal}>
        <UpdateProfileForm
          onClose={() => setShowModal(false)}
          user={user}
          hideForm={hideForm}
        />
      </Modal>
    </div>
  );
};

export default UpdateProfileModal;
