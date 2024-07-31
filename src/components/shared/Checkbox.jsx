import React from "react";

const Checkbox = ({ children, ...props }) => {
  return (
    <div>
        <label style={{ marginRight: "1em" }}>
        <input type="checkbox" {...props} />
        {children}
        </label>

    </div>
  );
};

export default Checkbox;
