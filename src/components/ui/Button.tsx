import React, { ButtonHTMLAttributes } from "react";
import "../../styles/globals.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const Button: React.FC<ButtonProps> = ({ variant = "primary", children, ...props }) => {
  const className =
    variant === "primary" ? "btn btn-primary cta-btn" : "btn btn-secondary cta-btn";

  return (
    <button className={className} {...props}>
      <div className="btn-text-wrapper">
        <p className="btn-text">{children}</p>
        <p className="btn-text">{children}</p>
      </div>
    </button>
  );
};

export default Button;
