import React from "react";
import { Form } from "react-bootstrap";

const FormSelect = props => {
  const { path, value, label, options, onChange } = props;

  const renderOptions = () => {
    return (
      options &&
      options.map(option => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))
    );
  };

  return (
    <Form.Group controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select" onChange={e => onChange(e, path)} value={value}>
        {renderOptions()}
      </Form.Control>
    </Form.Group>
  );
};

export default FormSelect;
