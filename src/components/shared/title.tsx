import { cn } from "../../utils/cn";

interface TitleProps {
  className?: string;
  title: string;
}

export default function Title({ className, title }: TitleProps) {
  return (
    <h2
      className={cn(
        "text-primary text-center text-2xl font-semibold",
        className,
      )}
    >
      {title}
    </h2>
  );
}
