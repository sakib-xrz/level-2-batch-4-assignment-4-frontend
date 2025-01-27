import { cn } from "../../utils/cn";
import { FormikProps } from "formik";

interface FormikErrorBoxProps<T> {
  formik: FormikProps<T>;
  name: keyof T;
  className?: string;
}

export default function FormikErrorBox<T>({
  formik,
  name,
  className,
}: FormikErrorBoxProps<T>) {
  const showError = formik.errors[name] && formik.touched[name];
  const defaultClassNames = "text-sm text-red-500 font-semibold mt-1";
  const errorMessage =
    typeof formik.errors[name] === "string" ? formik.errors[name] : undefined;

  return showError ? (
    <div>
      <div className={cn(defaultClassNames, className)}>{errorMessage}</div>
    </div>
  ) : null;
}
