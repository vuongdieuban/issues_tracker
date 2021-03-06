import {
  defaultFont,
  primaryColor,
  dangerColor,
  grayColor
} from "assets/jss/material-dashboard-react.js";
import tooltipStyle from "assets/jss/material-dashboard-react/tooltipStyle.js";
import checkboxAdnRadioStyle from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js";

const tasksStyle = {
  ...tooltipStyle,
  ...checkboxAdnRadioStyle,
  table: {
    marginBottom: "0",
    overflow: "visible"
  },
  tableRow: {
    position: "relative",
    borderBottom: "1px solid " + grayColor[5]
  },
  tableActions: {
    display: "flex",
    border: "none",
    padding: "12px 8px !important",
    verticalAlign: "middle"
  },
  tableCell: {
    ...defaultFont,
    padding: "8px",
    verticalAlign: "middle",
    border: "none",
    lineHeight: "1.42857143",
    fontSize: "14px"
  },
  tableCellRTL: {
    textAlign: "right"
  },
  tableActionButton: {
    width: "27px",
    height: "27px",
    padding: "0"
  },
  tableActionButtonIcon: {
    width: "17px",
    height: "17px"
  },
  edit: {
    backgroundColor: "transparent",
    color: primaryColor[0],
    boxShadow: "none"
  },
  close: {
    backgroundColor: "transparent",
    color: dangerColor[0],
    boxShadow: "none"
  },
  priorityUrgent: {
    color: "#e82517"
  },
  priorityHigh: {
    color: "#f0733a"
  },
  priorityMedium: {
    color: "#d6ad31"
  },
  priorityLow: {
    color: "#84e028"
  },
  taskTitleText: {
    fontSize: "13px",
    color: "#4682B4"
  },
  taskProjectName: {
    fontWeight: "bold",
    color: "#585858",
    fontSize: "12px"
  },
  taskOpenByText: {
    fontSize: "12px",
    color: "#a9a9a9"
  }
};
export default tasksStyle;
