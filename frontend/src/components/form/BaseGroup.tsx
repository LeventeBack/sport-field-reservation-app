import React from "react";
import { Form } from "react-bootstrap";

type Props = {
  label: string;
  children: React.ReactNode;
  error?: string;
};

const BaseGroup = ({ label, children, error }: Props) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      {children}
      {error && <Form.Text className="text-danger">{error}</Form.Text>}
    </Form.Group>
  );
};

export default BaseGroup;
