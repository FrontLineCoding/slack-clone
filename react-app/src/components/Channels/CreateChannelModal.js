import { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateChannel from "./CreateChannel";

const CreateChannelModal = ({hideForm}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="server-modal">
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <CreateChannel
            onClose={() => setShowModal(false)} hideForm={hideForm}
          />
        </Modal>
    </div>
  );
};

export default CreateChannelModal;
