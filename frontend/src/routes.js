/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import ProjectIssues from "views/ProjectIssues/ProjectIssues.js";
import UserProjects from "views/Projects/Projects.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    exact: true
  },
  {
    path: "/projects/:id",
    name: "Project Issues",
    icon: "",
    component: ProjectIssues,
    layout: "/admin",
    protected: false,
    showOnSideBar: false,
    exact: false
  },
  {
    path: "/projects",
    name: "Projects",
    icon: AssignmentOutlinedIcon,
    component: UserProjects,
    layout: "/admin",
    protected: false,
    showOnSideBar: true,
    exact: true
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    protected: true,
    showOnSideBar: true,
    exact: true
  }
];

export default dashboardRoutes;
