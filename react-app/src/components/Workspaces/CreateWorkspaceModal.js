import { useState } from "react";
import {Modal} from '../../context/Modal'
import CreateWorkspaceForm from "../Nav/CreateWorkspaceForm";


const CreateWorkspaceModal = ({hideForm}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="server-modal">
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <CreateWorkspaceForm
            onClose={() => setShowModal(false)} hideForm={hideForm}
          />
        </Modal>
    </div>
  );
};

export default CreateWorkspaceModal;
