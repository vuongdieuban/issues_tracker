import React from "react";
import { Form } from "react-bootstrap";
import FormInput from "components/FormInput/FormInput.js";
import FormSelect from "components/FormSelect/FormSelect.js";

const IssueForm = props => {
  const [projects, setProjects] = React.useState([]);
  const [issueType, setIssueTypes] = React.useState([]);
  const [priorities, setPriorities] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const [issue, setIssue] = React.useState({
    title: "",
    description: "",
    project: "",
    issueType: "",
    priority: "",
    openBy: "",
    status: ""
  });

  React.useEffect(() => {}, []);

  const handleSubmit = event => {
    event.preventDefault();
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
        options={[1, 2, 3, 4, 5]}
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
    </Form>
  );
};
export default IssueForm;
