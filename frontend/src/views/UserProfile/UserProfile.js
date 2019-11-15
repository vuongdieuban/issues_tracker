import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import avatar from "assets/img/faces/marc.jpg";

import Issues from "components/Issues/Issues.js";
import userService from "services/userService.js";
import authService from "services/authService.js";

const styles = {};
const useStyles = makeStyles(styles);

export default function UserProfile(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState(null);
  const [issues, setIssues] = React.useState(null);

  const handleIssuesModified = issues => {
    setIssues(issues);
  };

  // Call when component mounted.
  // Check for current user in local storage
  React.useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);

    const fetchData = async () => {
      try {
        const issues = await userService.getOne(currentUser._id);
        setIssues(issues);
      } catch (ex) {
        if (
          ex.response &&
          (ex.response.status === 404 || ex.response.status === 400)
        ) {
          toast.error("Invalid User Id");
          return props.history.replace("/");
        }
      }
    };
    fetchData();
  }, []);

  return user ? (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Issues
            user={user}
            issues={issues}
            onIssuesModified={handleIssuesModified}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>
                {user.isAdmin ? "ADMIN" : "MEMBER"}
              </h6>
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
