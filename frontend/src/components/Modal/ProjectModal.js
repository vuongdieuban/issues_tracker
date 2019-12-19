import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import styles from "assets/jss/material-dashboard-react/components/modalStyle.js";

const useStyles = makeStyles(styles);

const ProjectModal = props => {
  const classes = useStyles();
  const { open, onClose } = props;
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
      className={classes.modal}
    >
      <div className={classes.paper}>Put the Project Form here</div>
    </Modal>
  );
};

export default ProjectModal;
