import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Search from "@material-ui/icons/Search";
import CustomInput from "components/CustomInput/CustomInput.js";
import Projects from "components/Projects/Projects.js";
import projectService from "services/projectService.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const ProjectsView = props => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [state, setState] = React.useState({
    allProjects: [],
    filteredProjects: [],
    searchValue: ""
  });
  const { allProjects, filteredProjects, searchValue } = state;

  const handleSearchChange = e => {
    const searchValue = e.currentTarget.value;
    setState({ ...state, searchValue });
  };

  // call on mount
  React.useEffect(() => {
    const fetchData = async () => {
      const allProjects = await projectService.getAll();
      setState({ ...state, allProjects, filteredProjects: allProjects });
    };
    fetchData();
  }, []);

  // watch searchValue and filter the projects
  React.useEffect(() => {
    const filteredProjects = allProjects.filter(project =>
      project.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setState({ ...state, filteredProjects });
  }, [searchValue]);

  return (
    <React.Fragment>
      <div className={classes.searchWrapper}>
        <IconButton>
          <Search />
        </IconButton>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            },
            value: searchValue,
            onChange: handleSearchChange
          }}
        />
        {/* <IconButton>
          <AddIcon />
        </IconButton> */}
      </div>

      {allProjects ? <Projects projects={filteredProjects} /> : null}
    </React.Fragment>
  );
};

export default ProjectsView;
