import React, { createContext } from "react";
import UserStore from "../stores/UserStore";
import ContactStore from "../stores/ContactStore";

// Создание контекста
export const DataContext = createContext(null);

const userStore = new UserStore();
const contactStore = new ContactStore();

/*  Компонент Context Provider  */
function DataProvider({ children }) {
  return (
    <DataContext.Provider value={{ userStore, contactStore }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
