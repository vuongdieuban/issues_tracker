import React from "react";
import { toast } from "react-toastify";
import Issues from "components/Issues/Issues.js";
import projectService from "services/projectService";
import authService from "services/authService";

const ProjectIssues = props => {
  const [user, setUser] = React.useState(null);
  const [issues, setIssues] = React.useState(null);
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

  return <Issues user={user} issues={issues} />;
};

export default ProjectIssues;
