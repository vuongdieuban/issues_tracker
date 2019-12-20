import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import ProjectForm from "components/Form/ProjectForm.js";

const ProjectModal = props => {
  const { open, onClose, onSave } = props;
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogContent>
        <ProjectForm onSave={onSave} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
