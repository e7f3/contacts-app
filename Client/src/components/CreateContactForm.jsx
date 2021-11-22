import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { addContact } from "../http/contactsAPI.js";
import { useStore } from "../hooks/useStore";
import { useAsync } from "../hooks/useAsync";
import ContactForm from "./ContactForm.jsx";

/*  Компонент формы, организующий создание нового контакта */
const CreateContactForm = observer(
  ({ doReset, setDoReset, ...props }, ref) => {

    // Получение из контекста глобальных состояний пользователя и списка контактов
    const { userStore, contactStore } = useStore();

     //  Организация запроса на добавление контакта в список контактов
    const { execute, status, value, error } = useAsync(addContact, false);

    //  В случае ошибки в результате запроса
    useEffect(() => {
      if (error) {
        if (error.response) alert(error.response.data.message);
        else console.log(error.message);
      }
    }, [error]);

    //  В случае успешного запроса
    useEffect(() => {
      if (value) {
        // Отображение контактов в лексикографическом порядке
        contactStore.contacts = [value, ...contactStore.contacts].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setDoReset(true);
        ref.current.classList.toggle("hidden");
      }
    }, [value]);

    const handleSubmit = (data) => {
      execute({ userId: userStore.user.id, contactData: data });
    };

    return (
      <ContactForm
        onSubmit={handleSubmit}
        formTitle="Create new contact"
        buttonText="Create"
        ref={ref}
        doReset={doReset}
        {...props}
      />
    );
  },
  { forwardRef: true }
);

export default CreateContactForm;
