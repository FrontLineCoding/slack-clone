import { useState } from "react";
import { Modal } from "../../context/Modal";
import EditChannel from "./EditChannel";

const EditChannelModal = ({setShowEdit}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="server-modal">
        <Modal onClose={() => setShowCreateModal(false)} showCreateModal={showCreateModal}>
          <EditChannel
            onClose={() => setShowCreateModal(false)} setShowEdit={setShowEdit}
          />
        </Modal>
    </div>
  );
};

export default EditChannelModal;
