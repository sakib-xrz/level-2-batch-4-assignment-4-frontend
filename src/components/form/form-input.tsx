import { Input } from "antd";
import FormikErrorBox from "../shared/formik-error-box";
import Label from "../shared/label";
import { FormikProps } from "formik";
import { InputProps } from "antd/lib/input";

interface FormInputProps<T> extends InputProps {
  label?: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  formik: FormikProps<T>;
  type?: string;
}

export default function FormInput<T>({
  label,
  name,
  required,
  placeholder,
  formik,
  type = "text",
  ...props
}: FormInputProps<T>) {
  return (
    <div>
      {label && (
        <Label htmlFor={name as string} required={required}>
          {label}
        </Label>
      )}
      <>
        {type === "password" ? (
          <Input.Password
            placeholder={placeholder}
            {...formik.getFieldProps(name)}
            {...props}
          />
        ) : (
          <Input
            type={type}
            placeholder={placeholder}
            {...formik.getFieldProps(name)}
            {...props}
            onWheel={() =>
              type === "number"
                ? (document.activeElement as HTMLElement)?.blur()
                : props.onWheel
            }
          />
        )}

        <FormikErrorBox formik={formik} name={name as keyof T} />
      </>
    </div>
  );
}
