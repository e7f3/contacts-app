import jwtDecode from "jwt-decode";
import { $host, $authHost } from "./index";

/*  API для запросов, касающихся списка контактов пользователя */

export const getAllContacts = async () => {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const response = await $authHost.post("/api/contacts", { userId: user.id });
  return response.data.contacts;
};

export const addContact = async (userData) => {
  const { userId, contactData } = userData;
  const response = await $authHost.post("/api/contacts/add", {
    userId,
    contactData,
  });
  return response.data.contact;
};

export const removeContact = async (userData) => {
  const { userId, contactId } = userData;
  const response = await $authHost.post("/api/contacts/remove", {
    userId,
    contactId,
  });
  return response.data.filtered;
};

export const changeContact = async (userData) => {
  const { userId, contactId, contactData } = userData;
  const response = await $authHost.post("/api/contacts/change", {
    userId,
    contactId,
    contactData,
  });
  return response.data.contacts;
};
