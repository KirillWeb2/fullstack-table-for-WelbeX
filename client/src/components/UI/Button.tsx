import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button {...rest} className={`button button--hyperion ${rest.className}`}>
      <span>
        <span>{children}</span>
      </span>
    </button>
  );
};
