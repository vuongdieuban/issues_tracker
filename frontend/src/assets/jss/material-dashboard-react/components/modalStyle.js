const issueModalFormStyle = theme => ({
  paper: {
    position: "absolute",
    width: 400,
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default issueModalFormStyle;
