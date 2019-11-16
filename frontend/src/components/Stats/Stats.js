import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const Stats = props => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { headerColor, category, title, footer, unit } = props;
  return (
    <GridItem xs={12} sm={6} md={3}>
      <Card>
        <CardHeader color={headerColor} stats icon>
          <CardIcon color={headerColor}>
            <props.cardIcon />
          </CardIcon>
          <p className={classes.cardCategory}>{category}</p>
          <h3 className={classes.cardTitle}>
            {title} <small>{unit}</small>
          </h3>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            <props.footerIcon />
            {footer}
          </div>
        </CardFooter>
      </Card>
    </GridItem>
  );
};

export default Stats;
