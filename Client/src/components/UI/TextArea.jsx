import React from "react";

function TextArea({ register, name, ...props }) {
  /*  Если в необходимо, 
      регистрирует text-area для работы с формой React Hook Form  */
  return register ? (
    <textarea {...register(name)} {...props} />
  ) : (
    <textarea {...props} />
  );
}

export default TextArea;
