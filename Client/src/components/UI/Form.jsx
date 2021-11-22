import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/*  Компонент формы React Hook Form */
const Form = ({
  defaultValues,
  schema,
  children,
  onSubmit,
  doReset,
  ...props
}) => {
  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { handleSubmit, reset } = methods;

  // Сброс данных формы при необходимости
  useEffect(() => {
    if (doReset) reset();
  }, [doReset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} {...props}>
      {React.Children.map(children, (child) => {
        return (
          <div className="field">
            {child.props.label && (
              <h6 className="title title--h6">{child.props.label}</h6>
            )}
            {
            /* Обработка children:
                при наличии prop name создаёт элемент,
                аналогичный child,
                чтобы зарегистрировать его для работы с React Hook Form */
            }
            {child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register: methods.register,
                    key: child.props.name,
                  },
                })
              : child}
          </div>
        );
      })}
    </form>
  );
};

export default Form;
