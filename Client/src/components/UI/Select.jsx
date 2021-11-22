import React from "react";

function Select({ register, options, name, defaultText, ...props }) {
    /*  Регистрирует select для работы с формой React Hook Form  */
  return (
    <select {...register(name)} {...props}>
      {/* Значение по-умолчанию */}
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
