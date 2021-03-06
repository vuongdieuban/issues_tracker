import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import CheckCircleOutlined from "@material-ui/icons/CheckCircleOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";

// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

export default function Tasks(props) {
  const classes = useStyles();
  const { tasks, onViewEditClick, onRemoveClick, user } = props;
  const getTaskStatus = task => {
    if (task.status.name === "Open") {
      const statusClassName = classes["priority" + task.priority.name];
      return <InfoOutlinedIcon className={statusClassName} />;
    }
    return <CheckCircleOutlined />;
  };

  const renderAction = (task, index) => {
    let tooltips = [];
    const authorize = [
      {
        id: "edit",
        title: "Edit",
        className: classes.tableActionButtonIcon + " " + classes.edit,
        Icon: Edit,
        onClick: () => onViewEditClick(task, false)
      },
      {
        id: "remove",
        title: "Remove",
        className: classes.tableActionButtonIcon + " " + classes.close,
        Icon: Close,
        onClick: () => onRemoveClick(task)
      }
    ];
    const nonAuthorize = [
      {
        id: "view",
        title: "View",
        className: classes.tableActionButtonIcon + " " + classes.edit,
        Icon: VisibilityIcon,
        onClick: () => onViewEditClick(task, true)
      }
    ];

    if (user && (user._id === task.openBy._id || user.isAdmin)) {
      tooltips = authorize;
    } else {
      tooltips = nonAuthorize;
    }

    return tooltips.map(tooltip => (
      <Tooltip
        key={tooltip.id}
        id={tooltip.id}
        title={tooltip.title}
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          className={classes.tableActionButton}
          onClick={tooltip.onClick}
        >
          <tooltip.Icon className={tooltip.className} />
        </IconButton>
      </Tooltip>
    ));
  };

  return (
    <Table className={classes.table}>
      <TableBody>
        {tasks.map((task, index) => (
          <TableRow key={index} className={classes.tableRow}>
            <TableCell className={(classes.tableCell, classes.taskStatus)}>
              {getTaskStatus(task)}
            </TableCell>
            <TableCell className={classes.tableCell}>
              <div className={classes.taskProjectName}>{task.project.name}</div>
              <div className={classes.taskTitleText}>{task.title}</div>
              <div className={classes.taskOpenByText}>
                Opened by {task.openBy.name}
              </div>
            </TableCell>
            <TableCell className={classes.tableActions}>
              {renderAction(task, index)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object)
};
