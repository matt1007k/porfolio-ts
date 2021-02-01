import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder?: string;
  label: string;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);
  return (
    <div>
      <label htmlFor={field.name}>{props.label}</label>
      <input {...field} name={field.name} type={props.type} />
      {error ? <div>{error}</div> : null}
      {/* !!error // bool */}
    </div>
  );
};
