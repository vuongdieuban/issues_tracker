import React from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Alarm from "@material-ui/icons/Alarm";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Search from "@material-ui/icons/Search";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import projectService from "services/projectService";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

export default function Dashboard(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { user } = props;
  const [projects, setProjects] = React.useState(null);

  // Call when component mounted
  React.useEffect(() => {
    const fetchData = async () => {
      const projects = await projectService.getAll();
      setProjects(projects);
    };
    fetchData();
  }, []);

  const renderProjects = () => {
    let displayProjects = projects;
    if (displayProjects.length >= 3) {
      displayProjects = displayProjects.slice(0, 3);
    }

    return displayProjects.map(project => (
      <GridItem xs={12} sm={12} md={4} key={project._id}>
        <Card chart>
          <CardBody>
            <h4 className={classes.cardTitle}>{project.name}</h4>
            <p className={classes.cardCategory}>{project.summary}</p>
          </CardBody>
          <CardFooter chart>
            <div className={classes.stats}>
              <BuildOutlinedIcon />
              {project.languages}
            </div>
          </CardFooter>
        </Card>
      </GridItem>
    ));
  };

  return (
    <div>
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
      <span
        style={{
          color: "#A9A9A9",
          textTransform: "uppercase",
          fontWeight: "bold",
          fontSize: "14px"
        }}
      >
        Latest Projects
      </span>
      {projects ? <GridContainer>{renderProjects()}</GridContainer> : null}
    </div>
  );
}
