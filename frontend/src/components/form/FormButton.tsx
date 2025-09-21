import React from "react";
import { Button } from "react-bootstrap";
import { ButtonProps } from "react-bootstrap";

const FormButton = ({
  type = "button",
  className = "",
  variant = "info",
  children,
  ...rest
}: ButtonProps) => {
  return (
    <Button
      type={type}
      variant={variant}
      className={`w-auto mx-auto ${className}`}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default FormButton;
