import React from "react";
import { Form } from "react-bootstrap";

const FormInput = props => {
  const { label, path, value, onChange, type, as, placeholder, rows } = props;

  return (
    <Form.Group controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        value={value}
        onChange={e => onChange(e, path)}
        placeholder={placeholder}
        type={type}
        className="form-control"
        as={as}
        rows={rows}
      />
    </Form.Group>
  );
};

export default FormInput;
