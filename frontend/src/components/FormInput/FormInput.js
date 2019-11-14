import React from "react";
import { Form } from "react-bootstrap";

const FormInput = props => {
  const { label, path, value, onChange, readOnly, ...rest } = props;
  return (
    <Form.Group controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        value={value}
        onChange={e => onChange(e, path)}
        className="form-control"
        readOnly={readOnly}
        {...rest}
      />
    </Form.Group>
  );
};

export default FormInput;
