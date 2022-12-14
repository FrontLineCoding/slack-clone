import { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateChannel from "./CreateChannel";

const CreateChannelModal = ({setShowModal}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="server-modal">
        <Modal onClose={() => setShowCreateModal(false)} showCreateModal={showCreateModal}>
          <CreateChannel
            onClose={() => setShowCreateModal(false)} setShowModal={setShowModal}
          />
        </Modal>
    </div>
  );
};

export default CreateChannelModal;
