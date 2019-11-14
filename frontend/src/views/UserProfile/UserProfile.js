import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import avatar from "assets/img/faces/marc.jpg";
import authService from "services/authService";

import Issues from "components/Issues/Issues.js";

const styles = {};
const useStyles = makeStyles(styles);

export default function UserProfile(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState(null);
  // Call when component mounted.
  // Check for current user in local storage
  React.useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  return user ? (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Issues user={user} mode={{ name: "UserId", id: user._id }} />
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>{user.name}</h4>
              <p className={classes.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
                possimus saepe labore incidunt doloribus optio! Placeat, alias
                similique!
              </p>
              <Button color="primary" round>
                Edit
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  ) : null;
}
