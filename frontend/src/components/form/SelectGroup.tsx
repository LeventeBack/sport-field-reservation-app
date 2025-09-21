import { InputHTMLAttributes, Ref, forwardRef } from "react";
import { Form } from "react-bootstrap";
import BaseGroup from "./BaseGroup";

type Option = {
  value: string | number;
  label: string;
};

type Props = InputHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
  options: Option[];
  size?: "sm" | "lg";
  error?: string;
};

const SelectGroup = forwardRef(
  ({ label, options, error, ...rest }: Props, ref: Ref<HTMLSelectElement>) => {
    return (
      <BaseGroup label={label} error={error}>
        <Form.Select {...rest} ref={ref}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      </BaseGroup>
    );
  }
);

export default SelectGroup;
