import React from "react";

const Button = React.forwardRef(({ ...props }, ref) => {
  return <button {...props} ref={ref}></button>;
});

export default Button;
