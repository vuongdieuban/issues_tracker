import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const Projects = props => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { projects } = props;
  return projects.map(project => (
    <GridItem xs={12} sm={12} md={4} key={project._id}>
      <Card chart>
        <Link to={`/admin/projects/${project._id}`}>
          <CardBody>
            <h4 className={classes.cardTitle}>{project.name}</h4>
            <p className={classes.cardCategory}>{project.summary}</p>
          </CardBody>
        </Link>
        <CardFooter>
          <div className={classes.stats}>
            <BuildOutlinedIcon />
            {project.languages}
          </div>
        </CardFooter>
      </Card>
    </GridItem>
  ));
};

export default Projects;
