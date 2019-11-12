import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
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
import ReportProblemOutlined from "@material-ui/icons/ReportProblemOutlined";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

export default function Tasks(props) {
  const classes = useStyles();
  const { tasks, onEditClick } = props;

  const getTaskStatus = task => {
    if (task.status.name === "Open") {
      const statusClassName = classes["priority" + task.priority.name];
      return <ReportProblemOutlined className={statusClassName} />;
    }
    return <CheckCircleOutlined />;
  };

  return (
    <Table className={classes.table}>
      <TableBody>
        {tasks.map((task, index) => (
          <TableRow key={index} className={classes.tableRow}>
            <TableCell className={classes.tableCell}>
              {getTaskStatus(task)}
            </TableCell>
            <TableCell className={classes.tableCell}>{task.title}</TableCell>
            <TableCell className={classes.tableCell}>
              by: {task.openBy.name}
            </TableCell>
            <TableCell className={classes.tableActions}>
              <Tooltip
                id="tooltip-top"
                title="Edit Task"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Edit"
                  className={classes.tableActionButton}
                  onClick={() => onEditClick(task)}
                >
                  <Edit
                    className={
                      classes.tableActionButtonIcon + " " + classes.edit
                    }
                  />
                </IconButton>
              </Tooltip>
              <Tooltip
                id="tooltip-top-start"
                title="Remove"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Close"
                  className={classes.tableActionButton}
                >
                  <Close
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                  />
                </IconButton>
              </Tooltip>
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
