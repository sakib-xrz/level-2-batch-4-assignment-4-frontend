import { cn } from "../../utils/cn";
import { LabelHTMLAttributes, ReactNode } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  children: ReactNode;
  required?: boolean;
}

export default function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    >
      {children} {props.required && <span className="text-red-500">*</span>}
    </label>
  );
}
