import { makeAutoObservable } from "mobx";

export default class ContactStore {
  searchQuery = "";
  constructor() {
    this._contacts = [];
    this._filteredContacts = [];
    makeAutoObservable(this);
  }
  get contacts() {
    return this._contacts;
  }
  set contacts(value) {
    this._contacts = value;
    this.filteredContacts = value;
  }
  get filteredContacts() {
    return this._filteredContacts;
  }
  set filteredContacts(value) {
    this._filteredContacts = value;
  }
  addContact(contact) {
    this.contacts.push(contact);
  }
  removeContact(id) {
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
  }
  filterContacts(query) {
    const reg = new RegExp(query.toLowerCase());
    this.filteredContacts = this.contacts.filter(
      ({ id, email, ...contactData }) => {
        return Object.values(contactData).find((value) =>
          reg.test(value.toLowerCase())
        );
      }
    );
  }
}
