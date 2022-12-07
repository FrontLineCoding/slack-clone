import { useState } from "react";
import {Modal} from '../../context/Modal'
import EditWorkspaceForm from "../Nav/EditWorkspaceForm";


const EditWorkspaceModal = ({setEditForm, workspaceId ,workspace, setCurrentWorkspace}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="server-modal">
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <EditWorkspaceForm
            onClose={() => setShowModal(false)}
            setEditForm={setEditForm}
            workspaceId={workspaceId}
            workspace={workspace}
            setCurrentWorkspace={setCurrentWorkspace}
          />
        </Modal>
    </div>
  );
};

export default EditWorkspaceModal;
