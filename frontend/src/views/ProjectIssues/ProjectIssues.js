import React from "react";
import Issues from "components/Issues/Issues.js";
import authService from "services/authService";

const ProjectIssues = props => {
  const [user, setUser] = React.useState(null);
  // Call when component mounted.
  // Check for current user in local storage in case props.user is not passed down due to user directly enter this page
  React.useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  // If user sign in on this page, the props.user will change due to top level (Admin) re-render and pass down.
  // Set currentUser to just signed in user
  React.useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  return (
    /* {Fetch issues by mode. 
      Either get issues from all projects, from single project or from single user. 
      Default is get all issues from all projects if mode is ignored} 
      mode.name = one of ["ProjectId", "UserId"]
      */
    <React.Fragment>
      <Issues
        user={user}
        mode={{ name: "ProjectId", id: props.match.params.id }}
      />
    </React.Fragment>
  );
};

export default ProjectIssues;
