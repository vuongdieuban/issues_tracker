import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Button from "components/CustomButtons/Button.js";
import FormInput from "components/FormInput/FormInput.js";
import FormSelect from "components/FormSelect/FormSelect.js";
import projectService from "services/projectService";
import issueTypeService from "services/issueTypeService";
import priorityService from "services/priorityService";
import statusService from "services/statusService";
import authService from "services/authService";
import issueService from "services/issueService";

const IssueForm = props => {
  const [state, setState] = React.useState({
    projects: [],
    issueTypes: [],
    priorities: [],
    status: [],
    readOnly: true,
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
    project: issue.project._id,
    issueType: issue.issueType._id,
    priority: issue.priority._id,
    openBy: issue.openBy._id,
    status: issue.status._id
  });

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const newIssue = await issueService.save(issue);
      handleSave(newIssue);
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 401 || ex.response.status === 403)
      )
        toast.error("Unauthorized!");
      handleCancel();
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

  const handleSave = newIssue => {
    const { onSave, onClose } = props;
    onSave(newIssue);
    onClose();
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
    <Form onSubmit={handleSubmit}>
      <FormInput
        label="Title"
        path="title"
        type="text"
        as="input"
        value={issue.title}
        onChange={handleInputChange}
        placeholder="Title"
        readOnly={state.readOnly}
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
