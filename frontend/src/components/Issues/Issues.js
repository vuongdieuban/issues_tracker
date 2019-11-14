import React from "react";
import BugReport from "@material-ui/icons/BugReport";
import NoteAdd from "@material-ui/icons/NoteAdd";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { toast } from "react-toastify";

import Button from "components/CustomButtons/Button";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import IssueModal from "components/Modal/IssueModal.js";
import issueService from "services/issueService";

const Issues = props => {
  const [openModal, setOpenModal] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [issues, setIssues] = React.useState(null);
  const [filteredIssues, setFilteredIssues] = React.useState({
    bugIssues: [],
    featureIssues: []
  });
  const [currentIssue, setCurrentIssue] = React.useState({
    issue: null,
    readOnly: true
  });

  const handleViewEditClick = (issue, readOnly) => {
    setCurrentIssue({ issue, readOnly });
    handleModalOpen();
  };

  const handleRemoveClick = issue => {
    setCurrentIssue({ issue });
    setOpenDialog(true);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCurrentIssueSave = newIssue => {
    const cloneIssue = [...issues];
    const index = issues.findIndex(issue => issue._id === newIssue._id);
    cloneIssue[index] = newIssue;
    setIssues(cloneIssue);
  };

  const handleCurrentIssueRemove = async () => {
    try {
      await issueService.remove(currentIssue.issue._id);
      const index = currentIssue.index;
      let cloneIssues = JSON.parse(JSON.stringify(issues));
      cloneIssues.splice(index, 1);
      setIssues(cloneIssues);
      setOpenDialog(false);
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 401 || ex.response.status === 403)
      )
        toast.error("Unauthorized!");
      setOpenDialog(false);
    }
  };

  // update issues when props.issues change
  React.useEffect(() => {
    const { issues, user } = props;
    setIssues(issues);
    setUser(user);
  }, [props.issues, props.user]);

  // update filteredIssues when issues change
  React.useEffect(() => {
    const bugIssues = [];
    const featureIssues = [];
    if (issues) {
      issues.forEach(issue => {
        if (issue.issueType.name === "Bug") {
          bugIssues.push(issue);
        } else if (issue.issueType.name === "Feature") {
          featureIssues.push(issue);
        }
      });
      setFilteredIssues({ bugIssues, featureIssues });
    }
  }, [issues]);

  return (
    <React.Fragment>
      {/* Display all issue sorted by date*/}
      {issues ? (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Features",
                  tabIcon: NoteAdd,
                  tabContent: (
                    <Tasks
                      tasks={filteredIssues.featureIssues}
                      user={user}
                      onViewEditClick={handleViewEditClick}
                      onRemoveClick={handleRemoveClick}
                    />
                  )
                },
                {
                  tabName: "Bugs",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      tasks={filteredIssues.bugIssues}
                      user={user}
                      onViewEditClick={handleViewEditClick}
                      onRemoveClick={handleRemoveClick}
                    />
                  )
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      ) : null}

      {/* {Display Modal when openModal is true} */}
      <IssueModal
        open={openModal}
        onClose={handleModalClose}
        onSave={handleCurrentIssueSave}
        issue={currentIssue.issue}
        readOnly={currentIssue.readOnly}
      />

      {/* {Display remove confimation dialog} */}
      <Dialog
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        open={openDialog}
      >
        <DialogTitle id="alert-dialog-title">
          Remove Issue Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to permanent delete an issue. Are you sure to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="danger" size="sm" onClick={handleCurrentIssueRemove}>
            Confirm
          </Button>
          <Button color="success" size="sm" onClick={handleDialogClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Issues;
