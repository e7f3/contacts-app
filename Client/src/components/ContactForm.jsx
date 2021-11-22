import React from "react";
import * as yup from "yup";
import Form from "./UI/Form.jsx";
import Input from "./UI/Input.jsx";

// Валидация полей формы при помощи yup
const schema = yup.object().shape({
  name: yup.string().max(40),
  phone: yup.string().required(),
  email: yup.string().email(),
});

/*  Компонент формы контакта пользователя */
const ContactForm = React.forwardRef(
  ({ onSubmit, formTitle, buttonText, children, ...props }, ref) => {

    //  Обработка открытия / закрытия формы
    const handleClick = (event) => {
      event.stopPropagation();
      if (event.target === ref.current) {
        event.target.classList.toggle("hidden");
      }
    };
    return (
      <div
        className="popup hidden"
        ref={ref}
        onClick={handleClick}
      >
        <div className="form-container form-container--contact">
          <h2 className="title title--h2">{formTitle}</h2>
          <Form className="form" schema={schema} onSubmit={onSubmit} {...props}>
            <Input
              className="input"
              name="name"
              label="Name *"
              placeholder="Full Name"
            />
            <Input
              className="input"
              name="phone"
              label="Phone *"
              placeholder="Phone Number"
            />
            <Input
              className="input"
              name="email"
              label="Email address"
              placeholder="example@gmail.com"
            />
            <Input
              className="button button--rectangle"
              type="submit"
              value={buttonText}
            />
          </Form>
          {children}
        </div>
      </div>
    );
  }
);

export default ContactForm;
