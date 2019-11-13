import React from "react";
import BugReport from "@material-ui/icons/BugReport";
import NoteAdd from "@material-ui/icons/NoteAdd";
import { toast } from "react-toastify";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import IssueModal from "components/Modal/IssueModal.js";
import issueService from "services/issueService";
import projectService from "services/projectService";
import authService from "services/authService";

const ProjectIssues = props => {
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
      try {
        // get all issues from current project id
        const issues = await projectService.getOne(props.match.params.id);
        setIssues(issues);
      } catch (ex) {
        if (
          ex.response &&
          (ex.response.status === 404 || ex.response.status === 400)
        ) {
          toast.error("Invalid Project Id");
          return props.history.replace("/");
        }
      }
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
