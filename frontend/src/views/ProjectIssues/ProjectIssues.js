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
  const [currentIssue, setCurrentIssue] = React.useState({
    index: null,
    issue: null,
    readOnly: true
  });

  const handleViewEditClick = (issue, index, readOnly) => {
    setCurrentIssue({ index, issue, readOnly });
    handleModalOpen();
  };

  const handleRemoveClick = (issue, index) => {
    let cloneIssues = JSON.parse(JSON.stringify(issues));
    cloneIssues.splice(index, 1);
    setIssues(cloneIssues);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleCurrentIssueSave = newIssue => {
    const cloneIssue = JSON.parse(JSON.stringify(issues));
    const index = currentIssue.index;
    cloneIssue[index] = newIssue;
    setIssues(cloneIssue);
  };

  // Call when component mounted.
  // Check for current user in local storage in case props.user is not passed down due to user directly enter this page
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

  // If user sign in on this page, the props.user will change due to top level (Admin) re-render and pass down.
  // Set currentUser to just signed in user
  React.useEffect(() => {
    setUser(props.user);
  }, [props.user]);

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
                      user={user}
                      onViewEditClick={handleViewEditClick}
                      onRemoveClick={handleRemoveClick}
                    />
                  )
                },
                {
                  tabName: "Features",
                  tabIcon: NoteAdd,
                  tabContent: (
                    <Tasks
                      tasks={issues}
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
    </React.Fragment>
  );
};

export default ProjectIssues;
