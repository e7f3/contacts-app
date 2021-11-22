import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore.js";
import Input from "./UI/Input.jsx";

/*  Компонент поиска по списку контактов  */
const Search = observer((props) => {
  const [query, setQuery] = useState("");
  const { contactStore } = useStore();
  useEffect(() => {
    contactStore.filterContacts(query);
  }, [query]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  return (
    <div className="search">
      <Input
        className="input"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  );
});

export default Search;
