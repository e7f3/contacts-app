import React from "react";

function Input({ register, name, ...props }) {
  return register ? (
    <input {...register(name)} {...props} />
  ) : (
    <input {...props} />
  );
}

export default Input;
