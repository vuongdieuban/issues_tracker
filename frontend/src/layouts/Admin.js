import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";

import auth from "../services/authService";
let ps;

const useStyles = makeStyles(styles);

export default function Admin(props) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const image = bgImage;
  const color = "blue";
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const handleSigninSuccess = async res => {
    const currentUser = await auth.signinUser(res.Zi.access_token);
    setUser(currentUser);
  };

  const handleSigninFail = async res => {
    const { error } = res;
    console.log(error);
    return alert(
      "Please allow pop up for this page. Clear Cache History if cannot log in"
    );
  };

  const handleSignout = () => {
    auth.signoutUser();
    setUser(null);
    props.history.replace("/admin");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
      setIsMobile(false);
    }
  };

  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (!isMobile) {
      if (navigator.platform.indexOf("Win") > -1) {
        ps = new PerfectScrollbar(mainPanel.current, {
          suppressScrollX: true,
          suppressScrollY: false
        });
        document.body.style.overflow = "hidden";
      }
      window.addEventListener("resize", resizeFunction);
    }

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (!isMobile) {
        if (navigator.platform.indexOf("Win") > -1) {
          ps.destroy();
        }
        window.removeEventListener("resize", resizeFunction);
      }
    };
  }, [mainPanel]);

  // Check for user upon mounting
  React.useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
  }, []);

  const switchRoutes = (
    <Switch>
      {routes.map((route, key) => {
        if (route.protected === true) {
          return (
            <ProtectedRoute
              path={route.layout + route.path}
              component={route.component}
              key={key}
            />
          );
        }

        if (route.layout === "/admin") {
          const Component = route.component;
          return (
            <Route
              path={route.layout + route.path}
              render={props => <Component {...props} user={user} />}
              key={key}
            />
          );
        }
        return null;
      })}
      <Redirect from="/admin" to="/admin/dashboard" />
    </Switch>
  );

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        user={user}
        onSigninSuccess={handleSigninSuccess}
        onSigninFail={handleSigninFail}
        onSignout={handleSignout}
        {...props}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          user={user}
          handleDrawerToggle={handleDrawerToggle}
          onSigninSuccess={handleSigninSuccess}
          onSigninFail={handleSigninFail}
          onSignout={handleSignout}
          {...props}
        />
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
      </div>
    </div>
  );
}
