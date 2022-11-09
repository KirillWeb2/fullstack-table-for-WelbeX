import React from "react";

interface SelectProps
  extends React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    React.AriaAttributes {
  columns: string[];
}

export const Select: React.FC<SelectProps> = ({ columns, ...rest }) => {
  return (
    <select className="filters__select" {...rest}>
      <option value="">Select a column</option>
      {columns.map((i) => (
        <option key={i} disabled={i === "date"} value={i}>
          {i}
        </option>
      ))}
    </select>
  );
};
