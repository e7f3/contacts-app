import React, { useEffect } from "react";
import * as yup from "yup";
import { useStore } from "../hooks/useStore";
import Form from "./UI/Form.jsx";
import Input from "./UI/Input.jsx";
import { login, registration } from "../http/userAPI";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useAsync } from "../hooks/useAsync";

const schema = yup.object().shape({
  name: yup.string().max(40),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const AuthForm = observer(({ isLogin, ...props }) => {
  const { userStore } = useStore();
  const navigate = useNavigate();
  const { execute, status, value, error } = useAsync(
    isLogin ? login : registration,
    false
  );
  
  useEffect(() => {
    if (error) {
      if (error.response) alert(error.response.data.message);
      else console.log(error.message);
    }
  }, [error]);
  useEffect(() => {
    if (value) {
      userStore.user = value;
      userStore.isAuth = true;
      navigate("/contacts");
    }
  }, [value]);

  const handleClick = (data) => {
    execute(data);
  };

  return (
    <Form schema={schema} onSubmit={handleClick} {...props}>
      {isLogin ? (
        <></>
      ) : (
        <Input
          className="input"
          name="name"
          label="Name *"
          placeholder="Full Name"
        />
      )}
      <Input
        className="input"
        name="email"
        label="Email address *"
        placeholder="example@gmail.com"
      />
      <Input
        className="input"
        name="password"
        type="password"
        label="Password *"
        placeholder="********"
      />
      <Input
        className="button button--rectangle"
        type="submit"
        value="Submit"
      />
    </Form>
  );
});

export default AuthForm;
