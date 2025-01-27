import { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  const containerClasses = cn("mx-auto max-w-7xl px-4 py-5 lg:py-8", className);

  return <div className={containerClasses}>{children}</div>;
}
