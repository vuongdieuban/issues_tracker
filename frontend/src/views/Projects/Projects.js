import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Search from "@material-ui/icons/Search";

import Projects from "components/Projects/Projects.js";
import projectService from "services/projectService.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const ProjectsView = props => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [projects, setProjects] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      const projects = await projectService.getAll();
      setProjects(projects);
    };
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div>
      {projects ? <Projects projects={projects} /> : null}
    </React.Fragment>
  );
};

export default ProjectsView;
