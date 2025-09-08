import React, { ButtonHTMLAttributes } from "react";
import "../../styles/globals.css"; // ensure your variables are loaded

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const Button: React.FC<ButtonProps> = ({ variant = "primary", children, ...props }) => {
  const className = variant === "primary" ? "btn btn-primary cta-btn" : "btn btn-secondary cta-btn";
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
