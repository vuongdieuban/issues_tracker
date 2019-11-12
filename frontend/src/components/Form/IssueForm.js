import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import Button from "components/CustomButtons/Button.js";
import FormInput from "components/FormInput/FormInput.js";
import FormSelect from "components/FormSelect/FormSelect.js";
import projectService from "services/projectService";
import issueTypeService from "services/issueTypeService";
import priorityService from "services/priorityService";
import statusService from "services/statusService";
import authService from "services/authService";

const IssueForm = props => {
  const [state, setState] = React.useState({
    projects: [],
    issueTypes: [],
    priorities: [],
    status: [],
    isDone: false
  });
  const [issue, setIssue] = React.useState({
    title: "",
    description: "",
    project: "",
    issueType: "",
    priority: "",
    openBy: "",
    status: ""
  });

  // fetch data on mount
  React.useEffect(() => {
    const fetchData = async () => {
      const projects = await projectService.getAll();
      const issueTypes = await issueTypeService.getAll();
      const priorities = await priorityService.getAll();
      const status = await statusService.getAll();
      setState({
        ...state,
        projects,
        issueTypes,
        priorities,
        status,
        isDone: true
      });
    };
    fetchData();
  }, []);

  // run after state finish loading to fill in issue data
  React.useEffect(() => {
    // check to see if issue passed down from props is empty or not.
    // If empty then we create a new issue and give select fields default value
    // Else we are editting existing issue. So populate the form with this issue info
    if (Object.keys(props.issue).length !== 0) {
      const existIssue = mapToViewModel(props.issue);
      setIssue(existIssue);
    } else {
      if (state.isDone) {
        const user = authService.getCurrentUser();
        const newIssue = { ...issue };
        newIssue.project = state.projects[0]._id;
        newIssue.issueType = state.issueTypes[0]._id;
        newIssue.priority = state.priorities[0]._id;
        newIssue.status = state.status[0]._id;
        newIssue.openBy = user._id;
        setIssue(newIssue);
      }
    }
  }, [state.isDone]);

  const mapToViewModel = issue => ({
    _id: issue._id,
    title: issue.title,
    description: issue.description,
    project: issue.project,
    issueType: issue.issueType,
    priority: issue.priority,
    openBy: issue.openBy,
    status: issue.status
  });

  const handleSubmit = event => {
    event.preventDefault();
    console.log("issue", issue);
    console.log("submitted");
  };

  const handleInputChange = (e, path) => {
    const value = e.currentTarget.value;
    console.log(`path:${path}\tvalue:${value}`);
    let data = { ...issue };
    data[path] = value;
    setIssue(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormInput
        label="Title"
        path="title"
        type="text"
        as="input"
        value={issue.title}
        onChange={handleInputChange}
        placeholder="Title"
      />
      <FormSelect
        label="Priority"
        path="priority"
        onChange={handleInputChange}
        value={issue.priority}
        options={state.priorities}
      />
      <FormInput
        label="Description"
        path="description"
        type="text"
        as="textarea"
        rows="10"
        value={issue.description}
        onChange={handleInputChange}
        placeholder="Description"
      />
      <Button
        color="primary"
        size="sm"
        variant="outlined"
        onClick={handleSubmit}
      >
        Save
      </Button>
      <Button
        color="danger"
        size="sm"
        variant="outlined"
        onClick={props.onCancel}
      >
        Close
      </Button>
    </Form>
  );
};
export default IssueForm;

IssueForm.propTypes = {
  issue: PropTypes.object
};
