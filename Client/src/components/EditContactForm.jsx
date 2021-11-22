import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore";
import { useAsync } from "../hooks/useAsync";
import { removeContact, changeContact } from "../http/contactsAPI";
import ContactForm from "./ContactForm.jsx";
import Button from "./UI/Button.jsx";
import { handleError } from "../tools/handleError";

/*  Компонент формы, организующий изменение / удаление контакта */
const EditContactForm = observer(
  ({ contact, onClose, ...props }, ref) => {

    // Получение из контекста глобальных состояний пользователя и списка контактов
    const { userStore, contactStore } = useStore();
    const { id, ...defaultValues } = contact;

    //  Организация запроса на удаление контакта
    const {
      execute: executeRemove,
      status: statusRemove,
      value: valueRemove,
      error: errorRemove,
    } = useAsync(removeContact, false);

    //  Организация запроса на измение контакта
    const {
      execute: executeChange,
      status: statusChange,
      value: valueChange,
      error: errorChange,
    } = useAsync(changeContact, false);

    //  В случае ошибки в результате запроса на удаление
    useEffect(() => {
      handleError(errorRemove);
    }, [errorRemove]);

        //  В случае ошибки в результате запроса на изменение
    useEffect(() => {
      handleError(errorChange);
    }, [errorChange]);

    //  В случае успешного запроса на удаление
    useEffect(() => {
      if (valueRemove) {
        contactStore.contacts = valueRemove;
      }
    }, [valueRemove]);

    //  В случае успешного запроса на изменение
    useEffect(() => {
      if (valueChange) {
        contactStore.contacts = valueChange;
      }
    }, [valueChange]);

    const handleRemove = () => {
      executeRemove({ userId: userStore.user.id, contactId: id });
    };
    const handleSubmit = (data) => {
      executeChange({
        userId: userStore.user.id,
        contactId: id,
        contactData: data,
      });
    };

    return (
      <ContactForm
        onSubmit={handleSubmit}
        formTitle="Edit contact"
        buttonText="Save changes"
        defaultValues={defaultValues}
        ref={ref}
        {...props}
      >
        <div className="edit-contact__extra-buttons">
          <Button className="button button--rectangle edit-contact__delete-button" onClick={handleRemove}>
            Delete contact
          </Button>
          <Button className="button button--rectangle button--white edit-contact__close-button" onClick={onClose}>
            Close
          </Button>
        </div>
      </ContactForm>
    );
  },
  {
    forwardRef: true,
  }
);

export default EditContactForm;
