import React from "react";
import { Form } from "react-bootstrap";
import Button from "components/CustomButtons/Button.js";
import FormInput from "components/FormInput/FormInput.js";

const ProjectForm = props => {
  const [state, setState] = React.useState({
    project: {
      name: "",
      summary: "",
      languages: ""
    },
    validated: false
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
      props.onSave(state.project); // pass back the correctly verified project
    }
  };

  const handleCancel = () => {
    props.onClose();
  };

  const handleInputChange = (e, path) => {
    const value = e.currentTarget.value;
    setState(prevState => {
      prevState.project[path] = value;
      return { ...prevState };
    });
  };

  return (
    <Form onSubmit={handleSubmit} noValidate validated={state.validated}>
      <FormInput
        label="Name"
        path="name"
        type="text"
        as="input"
        value={state.project.name}
        onChange={handleInputChange}
        placeholder="Name"
        required
      />
      <FormInput
        label="Summary"
        path="summary"
        type="text"
        as="input"
        value={state.project.summary}
        onChange={handleInputChange}
        placeholder="Summary"
        required
      />
      <FormInput
        label="Languages"
        path="languages"
        type="text"
        as="input"
        value={state.project.languages}
        onChange={handleInputChange}
        placeholder="Languages"
        required
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
        onClick={handleCancel}
      >
        Close
      </Button>
    </Form>
  );
};

export default ProjectForm;
