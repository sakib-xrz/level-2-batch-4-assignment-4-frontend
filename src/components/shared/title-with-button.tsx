import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { PlusIcon } from "lucide-react";

interface TitleWithButtonProps {
  title: string;
  buttonText?: string;
  href?: string;
  onClick?: () => void;
  icon?: boolean;
}

const TitleWithButton: React.FC<TitleWithButtonProps> = ({
  title,
  buttonText = "",
  href = "",
  onClick = () => {},
  icon = true,
}) => {
  return (
    <div
      className={`flex flex-wrap items-center justify-between md:gap-0 ${
        buttonText && "gap-4"
      }`}
    >
      <h2 className="text-primary text-lg font-semibold md:text-2xl xl:text-3xl">
        {title}
      </h2>
      <div className="hidden w-fit sm:block">
        {buttonText ? (
          href ? (
            <Link to={href}>
              <Button
                type="primary"
                icon={icon && <PlusIcon size={16} className="text-white" />}
              >
                {buttonText}
              </Button>
            </Link>
          ) : (
            <Button
              onClick={onClick}
              type="primary"
              icon={icon && <PlusIcon />}
            >
              {buttonText}
            </Button>
          )
        ) : null}
      </div>
      <div className="block w-fit sm:hidden">
        {buttonText ? (
          href ? (
            <Link to={href}>
              <Button size="small" type="primary" icon={icon && <PlusIcon />}>
                {buttonText}
              </Button>
            </Link>
          ) : (
            <Button
              size="small"
              onClick={onClick}
              type="primary"
              icon={icon && <PlusIcon />}
            >
              {buttonText}
            </Button>
          )
        ) : null}
      </div>
    </div>
  );
};

export default TitleWithButton;
