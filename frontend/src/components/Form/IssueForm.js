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
    readOnly: true,
    validated: false,
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

  // fetch data and setState on mount
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
        isDone: true,
        readOnly: props.readOnly
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
        // if projectId exist then this is arrived from /projects/:id
        // set default project to the current project (/projects/:id) id
        newIssue.project = props.projectId
          ? props.projectId
          : state.projects[0]._id;
        newIssue.issueType = state.issueTypes[0]._id;
        newIssue.priority = state.priorities[0]._id;
        newIssue.status = state.status[0]._id;
        newIssue.openBy = user._id;
        setIssue(newIssue);
      }
    }

    // if projectId exist, then the options of project field is limit to only the current project
    if (props.projectId) {
      const projectOptions = state.projects.filter(
        project => project._id === props.projectId
      );
      setState({ ...state, projects: projectOptions });
    }
  }, [state.isDone]);

  const mapToViewModel = issue => ({
    _id: issue._id,
    title: issue.title,
    description: issue.description,
    project: issue.project._id,
    issueType: issue.issueType._id,
    priority: issue.priority._id,
    openBy: issue.openBy._id,
    status: issue.status._id
  });

  const handleSubmit = event => {
    // check form validate
    event.preventDefault();
    setState({ ...state, validated: true }); // tell the form to start running its validity check
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      // don't submit if validity is falise
      event.stopPropagation();
    } else {
      props.onSave(issue); // pass back the correctly verified issue
    }
  };

  const handleInputChange = (e, path) => {
    const value = e.currentTarget.value;
    let data = { ...issue };
    data[path] = value;
    setIssue(data);
  };

  const handleCancel = () => {
    props.onClose();
  };

  const renderFormSelect = () => {
    const selectFields = [
      { label: "Project", issuePath: "project", statePath: "projects" },
      { label: "Priority", issuePath: "priority", statePath: "priorities" },
      { label: "Issue Type", issuePath: "issueType", statePath: "issueTypes" },
      { label: "Status", issuePath: "status", statePath: "status" }
    ];
    return selectFields.map((field, index) => (
      <FormSelect
        key={index}
        label={field.label}
        path={field.issuePath}
        onChange={handleInputChange}
        value={issue[field.issuePath]}
        options={state[field.statePath]}
        disabled={state.readOnly}
      />
    ));
  };

  return (
    <Form onSubmit={handleSubmit} noValidate validated={state.validated}>
      <FormInput
        label="Title"
        path="title"
        type="text"
        as="input"
        value={issue.title}
        onChange={handleInputChange}
        placeholder="Title"
        readOnly={state.readOnly}
        required
      />
      {renderFormSelect()}
      <FormInput
        label="Description"
        path="description"
        type="text"
        as="textarea"
        rows="5"
        value={issue.description}
        onChange={handleInputChange}
        placeholder="Description"
        readOnly={state.readOnly}
        required
      />
      {state.readOnly ? (
        <Button
          color="danger"
          size="sm"
          variant="outlined"
          onClick={handleCancel}
        >
          Close
        </Button>
      ) : (
        <React.Fragment>
          <Button color="primary" size="sm" variant="outlined" type="submit">
            Save
          </Button>
          <Button
            color="danger"
            size="sm"
            variant="outlined"
            onClick={handleCancel}
          >
            Close
          </Button>
        </React.Fragment>
      )}
    </Form>
  );
};
export default IssueForm;

IssueForm.propTypes = {
  issue: PropTypes.object
};
