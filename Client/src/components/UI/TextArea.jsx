import React from "react";

function TextArea({ register, name, ...props }) {
  return register ? (
    <textarea {...register(name)} {...props} />
  ) : (
    <textarea {...props} />
  );
}

export default TextArea;
