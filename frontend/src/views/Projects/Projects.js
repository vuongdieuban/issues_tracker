import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Search from "@material-ui/icons/Search";
import CustomInput from "components/CustomInput/CustomInput.js";
import Projects from "components/Projects/Projects.js";
import ProjectModal from "components/Modal/ProjectModal.js";
import projectService from "services/projectService.js";
import authService from "services/authService.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const ProjectsView = props => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [user, setUser] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
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

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSave = async project => {
    const newProject = await projectService.save(project);
    setState(prevState => {
      prevState.allProjects.push(newProject);
      return { ...prevState };
    });
    setOpenModal(false);
  };

  // call on mount
  React.useEffect(() => {
    const fetchData = async () => {
      const allProjects = await projectService.getAll();
      setState({ ...state, allProjects, filteredProjects: allProjects });
    };
    fetchData();
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  // watch searchValue and filter the projects
  React.useEffect(() => {
    const filteredProjects = allProjects.filter(project =>
      project.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setState({ ...state, filteredProjects });
  }, [searchValue]);

  // if user login during this page, props.user change from top level
  React.useEffect(() => {
    setUser(props.user);
  }, [props.user]);

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

        {user ? (
          <IconButton onClick={handleModalOpen}>
            <AddIcon />
          </IconButton>
        ) : null}
      </div>

      <ProjectModal
        open={openModal}
        onClose={handleModalClose}
        onSave={handleSave}
      />

      {allProjects ? <Projects projects={filteredProjects} /> : null}
    </React.Fragment>
  );
};

export default ProjectsView;
