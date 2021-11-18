import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { addContact } from "../http/contactsAPI.js";
import { useStore } from "../hooks/useStore";
import { useAsync } from "../hooks/useAsync";
import ContactForm from "./ContactForm.jsx";

const CreateContactForm = observer(
  ({ doReset, setDoReset, ...props }, ref) => {
    const { userStore, contactStore } = useStore();
    const { execute, status, value, error } = useAsync(addContact, false);
    useEffect(() => {
      if (error) {
        if (error.response) alert(error.response.data.message);
        else console.log(error.message);
      }
    }, [error]);
    useEffect(() => {
      if (value) {
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
