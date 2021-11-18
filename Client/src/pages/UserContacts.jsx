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

const UserContacts = observer(() => {
  const navigate = useNavigate();
  const { contactStore } = useStore();
  const { status, value, error } = useAsync(getAllContacts);

  useEffect(() => {
    if (error) {
      if (error.response) alert(error.response.data.message);
      else console.log(error.message);
      navigate("/");
    }
  }, [error]);
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
