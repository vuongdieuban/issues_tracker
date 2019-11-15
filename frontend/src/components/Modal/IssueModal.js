import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import styles from "assets/jss/material-dashboard-react/components/modalStyle.js";
import IssueForm from "components/Form/IssueForm.js";

const useStyles = makeStyles(styles);

const IssueModal = props => {
  const classes = useStyles();
  const { open, onClose, issue, onSave, readOnly, projectId } = props;
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
      className={classes.modal}
    >
      <div className={classes.paper}>
        <IssueForm
          onClose={onClose}
          onSave={onSave}
          issue={issue}
          readOnly={readOnly}
          projectId={projectId}
        />
      </div>
    </Modal>
  );
};

export default IssueModal;

IssueModal.propTypes = {
  issue: PropTypes.object
};
