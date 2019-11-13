import React from "react";
import BugReport from "@material-ui/icons/BugReport";
import NoteAdd from "@material-ui/icons/NoteAdd";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import IssueModal from "components/Modal/IssueModal.js";

import issueService from "services/issueService";
import authService from "services/authService";

const ProjectIssues = props => {
  console.log("project id", props.match.params.id);
  const [openModal, setOpenModal] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [issues, setIssues] = React.useState(null);
  const [editIssue, setEditIssue] = React.useState({
    index: null,
    issue: null
  });

  const handleEditClick = (issue, index) => {
    setEditIssue({ index, issue });
    handleModalOpen();
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleEditIssueSave = newIssue => {
    const cloneIssue = JSON.parse(JSON.stringify(issues));
    const index = editIssue.index;
    cloneIssue[index] = newIssue;
    setIssues(cloneIssue);
  };

  // Call when component mounted
  React.useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);

    const fetchData = async () => {
      const issues = await issueService.getAll();
      setIssues(issues);
    };
    fetchData();
  }, []);

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
                  tabName: "Bugs",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      tasks={issues}
                      onEditClick={handleEditClick}
                      user={user}
                    />
                  )
                },
                {
                  tabName: "Features",
                  tabIcon: NoteAdd,
                  tabContent: (
                    <Tasks
                      tasks={issues}
                      onEditClick={handleEditClick}
                      user={user}
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
        issue={editIssue.issue}
        onSave={handleEditIssueSave}
      />
    </React.Fragment>
  );
};

export default ProjectIssues;
