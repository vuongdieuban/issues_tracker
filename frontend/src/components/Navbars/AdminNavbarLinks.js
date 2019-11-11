import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
// core components
import Button from "components/CustomButtons/Button.js";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks(props) {
  const { user, onSigninSuccess, onSigninFail, onSignout } = props;
  const classes = useStyles();
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const handleSignout = () => {
    setOpenProfile(null);
    onSignout();
  };

  return (
    <div>
      {user ? (
        <div className={classes.manager}>
          <span className={classes.linkText}>{user.name}</span>
          <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={openProfile ? "profile-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={handleClickProfile}
            className={classes.buttonLink}
          >
            <Person className={classes.icons} />
            <Hidden mdUp implementation="css">
              <p className={classes.linkText}>{user.name}</p>
            </Hidden>
          </Button>
          <Poppers
            open={Boolean(openProfile)}
            anchorEl={openProfile}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !openProfile }) +
              " " +
              classes.popperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="profile-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseProfile}>
                    <MenuList role="menu">
                      <Link to="/admin/user">
                        <MenuItem
                          className={classes.dropdownItem}
                          onClick={handleCloseProfile}
                        >
                          Profile
                        </MenuItem>
                      </Link>
                      <Divider light />
                      <MenuItem
                        onClick={handleSignout}
                        className={classes.dropdownItem}
                      >
                        Sign Out
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
      ) : (
        <div className={classes.manager}>
          <GoogleLogin
            render={renderProps => (
              <Button
                color={window.innerWidth > 959 ? "transparent" : "white"}
                simple={!(window.innerWidth > 959)}
                aria-owns={openProfile ? "profile-menu-list-grow" : null}
                aria-haspopup="true"
                className={classes.signInButton}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <Icon className="fa fa-google" />
                <p className={classes.linkText}>Sign In</p>
              </Button>
            )}
            clientId={process.env.REACT_APP_CLIENT_ID}
            onSuccess={onSigninSuccess}
            onFailure={onSigninFail}
            cookiePolicy="single_host_origin"
          />
        </div>
      )}
    </div>
  );
}
