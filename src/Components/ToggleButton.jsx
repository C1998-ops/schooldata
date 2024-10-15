import React, { useState } from "react";

const ToggleButton = ({ onChange }) => {
  const [toggle, setToggle] = useState(false);
  const handleChange = (event) => {
    setToggle(!toggle);
    onChange(event);
  };
  return (
    <label htmlFor="isActive" className="switch cursor-pointer shrink-0">
      <input
        type="checkbox"
        name="isActive"
        id="isActive"
        className="hidden"
        checked={toggle}
        onChange={handleChange}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleButton;
