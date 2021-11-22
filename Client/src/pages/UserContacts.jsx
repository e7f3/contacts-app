import React, { useEffect } from "react";
import { useStore } from "../hooks/useStore";
import { getAllContacts } from "../http/contactsAPI";
import { observer } from "mobx-react-lite";
import CreateContact from "../components/CreateContact.jsx";
import ContactCard from "../components/ContactCard.jsx";
import { useNavigate } from "react-router";
import { useAsync } from "../hooks/useAsync";
import Search from "../components/Search.jsx";
import Spinner from "../components/Spinner.jsx";

/*  Страница контактов пользователя */

const UserContacts = observer(() => {
  const navigate = useNavigate();

  // Получение из контекста глобального состояния списка контактов
  const { contactStore } = useStore();

  // Организация запроса на получение списка контактов пользователя
  const { status, value, error } = useAsync(getAllContacts);

  //  В случае ошибки в результате запроса
  useEffect(() => {
    if (error) {
      if (error.response) alert(error.response.data.message);
      else console.log(error.message);
      navigate("/");
    }
  }, [error]);

  //  В случае успешного запроса
  useEffect(() => {
    if (value) contactStore.contacts = value.sort((a, b) => a.name.localeCompare(b.name));
  }, [value]);

  return status !== "success" ? (
    <Spinner />
  ) : (
    <div className="content content--contacts">
      <Search />
      <CreateContact />
      {contactStore.filteredContacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
});

export default UserContacts;
