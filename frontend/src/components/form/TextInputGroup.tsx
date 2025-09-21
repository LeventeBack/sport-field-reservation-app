import { Ref, forwardRef } from "react";
import { Form, FormControlProps } from "react-bootstrap";
import BaseGroup from "./BaseGroup";

type Props = FormControlProps & {
  label: string;
  error?: string;
};

const TextInputGroup = forwardRef(
  (
    { label, type = "text", error, ...rest }: Props,
    ref: Ref<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    return (
      <BaseGroup label={label} error={error}>
        <Form.Control
          type={type}
          ref={ref}
          rows={5}
          autoComplete="on"
          isInvalid={!!error}
          {...rest}
        />
      </BaseGroup>
    );
  }
);

export default TextInputGroup;
