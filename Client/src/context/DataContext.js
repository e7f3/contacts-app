import React, { createContext } from "react";
import UserStore from "../stores/UserStore";
import ContactStore from "../stores/ContactStore";

export const DataContext = createContext(null);
const userStore = new UserStore();
const contactStore = new ContactStore();

function DataProvider({ children }) {
  return (
    <DataContext.Provider value={{ userStore, contactStore }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
