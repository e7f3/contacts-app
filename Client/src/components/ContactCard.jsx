import React, { useRef } from "react";
import { observer } from "mobx-react-lite";
import OptionsIcon from "../images/options_icon.svg";
import Button from "./UI/Button.jsx";
import EditContactForm from "./EditContactForm.jsx";

const ContactCard = observer(({ contact, ...props }) => {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current.classList.toggle("hidden");
  };
  return (
    <>
      <Card contact={contact} onClick={handleClick} />
      <EditContactForm
        contact={contact}
        onClose={handleClick}
        ref={ref}
        {...props}
      />
    </>
  );
});

function Card({ contact, onClick }) {
  return (
    <div className="card card--contact">
      {Object.getOwnPropertyNames(contact).map((keyName) => {
        if (keyName === "name" || keyName === "phone") {
          return (
            <div className="card__field" key={keyName}>
              <h6 className="title title--h6 card__title">{keyName}</h6>
              <span className="text">{contact[keyName]}</span>
            </div>
          );
        }
      })}
      <Button className="button button--img card__options" onClick={onClick}>
        <img
          className="card__options-icon"
          src={OptionsIcon}
          alt="options"
        />
      </Button>
    </div>
  );
}

export default ContactCard;
