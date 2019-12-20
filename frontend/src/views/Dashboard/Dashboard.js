import React from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Alarm from "@material-ui/icons/Alarm";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import BugReportOutlinedIcon from "@material-ui/icons/BugReportOutlined";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import Stats from "components/Stats/Stats.js";
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
    latestProjects: [],
    latestIssues: [],
    amountLatestIssues: 6,
    closedIssues: 0,
    openIssues: 0,
    user: null
  });

  // Call when component mounted
  React.useEffect(() => {
    const fetchData = async () => {
      const user = authService.getCurrentUser();
      const projects = await projectService.getAll();
      const issues = await issueService.getAll({});
      setState({ ...state, projects, issues, user });
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    // console.log("set user on PROPS");
    setState({ ...state, user: props.user });
  }, [props.user]);

  React.useEffect(() => {
    const latestProjects = getLatestProjects();
    setState(prevState => {
      return { ...prevState, latestProjects };
    });
  }, [state.projects]);

  React.useEffect(() => {
    const latestIssues = getLatestIssues();
    // count total number of issues, open and close and update those number
    const openIssues = state.issues.filter(
      issue => issue.status.name === "Open"
    ).length;
    const closedIssues = state.issues.length - openIssues;
    setState(prevState => {
      return { ...prevState, latestIssues, openIssues, closedIssues };
    });
  }, [state.issues]);

  const getLatestProjects = () => {
    let { projects } = JSON.parse(JSON.stringify(state));
    if (projects.length >= 3) {
      projects = projects.slice(0, 3);
    }
    return projects;
  };

  const getLatestIssues = () => {
    let { issues } = JSON.parse(JSON.stringify(state));
    const amount = state.amountLatestIssues;
    if (issues.length >= amount) {
      issues = issues.slice(0, amount);
    }
    return issues;
  };

  const handleIssuesModified = latestModIssues => {
    // replace the issues[0,amountLatestIssues] with latest Issues. Then update setState the issues.
    let { issues } = JSON.parse(JSON.stringify(state));
    const amount = state.amountLatestIssues;
    if (issues.length >= amount) {
      issues.splice(0, amount);
      issues = latestModIssues.concat(issues);
    } else {
      issues = latestModIssues;
    }
    setState({ ...state, issues });
  };

  const renderStats = () => {
    const stats = [
      {
        headerColor: "rose",
        icon: AssignmentOutlinedIcon,
        category: "Projects",
        title: state.projects.length,
        unit: "",
        footer: "Last 30 days",
        footerIcon: Alarm
      },
      {
        headerColor: "info",
        icon: BugReportOutlinedIcon,
        category: "Total Issues",
        title: state.issues.length,
        unit: "",
        footer: "Last few days",
        footerIcon: Alarm
      },
      {
        headerColor: "success",
        icon: CheckCircleOutlineOutlinedIcon,
        category: "Closed Issues",
        title: state.closedIssues,
        unit: "",
        footer: "Last few days",
        footerIcon: Alarm
      },
      {
        headerColor: "warning",
        icon: InfoOutlinedIcon,
        category: "Open Issues",
        title: state.openIssues,
        unit: "",
        footer: "Last few days",
        footerIcon: Alarm
      }
    ];
    return stats.map((stat, index) => (
      <Stats
        key={index}
        headerColor={stat.headerColor}
        cardIcon={stat.icon}
        category={stat.category}
        title={stat.title}
        unit={stat.unit}
        footer={stat.footer}
        footerIcon={stat.footerIcon}
      />
    ));
  };

  return (
    <React.Fragment>
      {/* Display number of projects, bugs and features*/}
      <GridContainer>{renderStats()}</GridContainer>

      {/* Display all the projets*/}
      <span className={classes.latestText}>Latest Projects</span>
      <Projects projects={state.latestProjects} />

      {/* Display Issues */}
      <span className={classes.latestText}>Latest Issues</span>
      <Issues
        user={state.user}
        issues={state.latestIssues}
        onIssuesModified={handleIssuesModified}
      />
    </React.Fragment>
  );
}
