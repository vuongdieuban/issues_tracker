import React from "react";
import Issues from "components/Issues/Issues.js";
import authService from "services/authService.js";
import issueService from "services/issueService.js";
import { toast } from "react-toastify";

const ProjectIssues = props => {
  const [user, setUser] = React.useState(null);
  const [issues, setIssues] = React.useState(null);
  // Call when component mounted.
  // Check for current user in local storage in case props.user is not passed down due to user directly enter this page
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const issues = await issueService.getAll({
          project: props.match.params.id
        });
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
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  // If user sign in on this page, the props.user will change due to top level (Admin) re-render and pass down.
  // Set currentUser to just signed in user
  React.useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  const handleIssuesModified = issues => {
    setIssues(issues);
  };

  return (
    <React.Fragment>
      <Issues
        user={user}
        issues={issues}
        onIssuesModified={handleIssuesModified}
        projectId={props.match.params.id} // projectId tells the IssueForm to limit the projects field in  to the current project only. If projectId is ignore then projects field will have all proejcts options
      />
    </React.Fragment>
  );
};

export default ProjectIssues;
