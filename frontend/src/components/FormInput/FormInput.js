import React from "react";
import { Form } from "react-bootstrap";

const FormInput = props => {
  const {
    label,
    path,
    value,
    onChange,
    type,
    as,
    placeholder,
    rows,
    readOnly
  } = props;

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
        readOnly={readOnly}
      />
    </Form.Group>
  );
};

export default FormInput;
