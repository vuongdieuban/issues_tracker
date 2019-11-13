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
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import ProjectIssues from "views/ProjectIssues/ProjectIssues.js";
import UserProjects from "views/UserProjects/UserProjects.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    exact: true
  },
  {
    path: "/user/projects/:id/issues",
    name: "Project Issues",
    rtlName: "",
    icon: "",
    component: ProjectIssues,
    layout: "/admin",
    protected: true,
    showOnSideBar: false,
    exact: false
  },
  {
    path: "/user/projects",
    name: "User Projects",
    rtlName: "",
    icon: "",
    component: UserProjects,
    layout: "/admin",
    protected: true,
    showOnSideBar: false,
    exact: false
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    protected: true,
    showOnSideBar: true,
    exact: true
  }
];

export default dashboardRoutes;
