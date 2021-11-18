import React from "react";

function Select({ register, options, name, defaultText, ...props }) {
  return (
    <select {...register(name)} {...props}>
      <option value="" selected disabled hidden>
        {defaultText}
      </option>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}

export default Select;
