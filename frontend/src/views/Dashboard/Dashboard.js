import React from "react";
import { Link } from "react-router-dom";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Alarm from "@material-ui/icons/Alarm";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Issues from "components/Issues/Issues.js";
import Projects from "components/Projects/Projects.js";
import projectService from "services/projectService.js";
import issueService from "services/issueService.js";
import authService from "services/authService.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

export default function Dashboard(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [state, setState] = React.useState({
    projects: [],
    issues: [],
    user: null
  });

  // Call when component mounted
  React.useEffect(() => {
    const fetchData = async () => {
      const user = authService.getCurrentUser();
      const projects = await getLatestProjects();
      const issues = await getLatestIssues();
      setState({ ...state, projects, issues, user });
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    // console.log("set user on PROPS");
    setState({ ...state, user: props.user });
  }, [props.user]);

  const getLatestProjects = async () => {
    let projects = await projectService.getAll();
    if (projects.length >= 3) {
      projects = projects.slice(0, 3);
    }
    return projects;
  };

  const getLatestIssues = async () => {
    let issues = await issueService.getAll();
    if (issues.length >= 6) {
      issues = issues.slice(0, 6);
    }
    return issues;
  };

  const handleIssuesModified = issues => {
    setState({ ...state, issues });
  };

  return (
    <div>
      {/* Display number of projects, bugs and features*/}
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Alarm />
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Alarm />
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      {/* Display all the projets*/}
      <span className={classes.latestText}>Latest Projects</span>
      <Projects projects={state.projects} />

      {/* Display Issues */}
      <span className={classes.latestText}>Latest Issues</span>
      <Issues
        user={state.user}
        issues={state.issues}
        onIssuesModified={handleIssuesModified}
      />
    </div>
  );
}
