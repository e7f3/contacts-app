import React from "react";

function Input({ register, name, ...props }) {
  /*  Если в необходимо, 
      регистрирует input для работы с формой React Hook Form  */
  return register ? (
    <input {...register(name)} {...props} />
  ) : (
    <input {...props} />
  );
}

export default Input;
