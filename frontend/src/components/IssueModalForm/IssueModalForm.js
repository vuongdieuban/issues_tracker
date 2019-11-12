import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

import styles from "assets/jss/material-dashboard-react/components/issueModalFormStyle.js";

const useStyles = makeStyles(styles);

const IssueModalForm = props => {
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
      <div className={classes.paper}>
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
      </div>
    </Modal>
  );
};

export default IssueModalForm;
