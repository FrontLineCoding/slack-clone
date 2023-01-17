import { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateWorkspaceForm from '../Nav/CreateWorkspaceForm';

const CreateWorkspaceModal = ({ hideForm, setChannelAdd }) => {
  const [showModal, setShowModal] = useState(false);
  setChannelAdd(false);

  return (
    <div className="server-modal">
      <Modal onClose={() => setShowModal(false)} showModal={showModal}>
        <CreateWorkspaceForm
          onClose={() => setShowModal(false)}
          hideForm={hideForm}
          setChannelAdd={setChannelAdd}
        />
      </Modal>
    </div>
  );
};

export default CreateWorkspaceModal;
