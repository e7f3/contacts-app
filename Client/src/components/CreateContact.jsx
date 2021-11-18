import React, { useRef, useState } from "react";
import Button from "./UI/Button.jsx";
import CreateContactForm from "./CreateContactForm.jsx";
import AddContactIcon from "../images/addcontact_icon.svg";

function CreateContact({ ...props }) {
  const [isFormReset, setIsFormReset] = useState(false);
  const ref = useRef(null);
  const handleClick = () => {
    ref.current.classList.toggle("hidden");
    setIsFormReset(false);
  };
  return (
    <>
      <div className="card create-contact">
        <Button
          className="button button--img create-contact__button"
          onClick={handleClick}
        >
          <img className="create-contact__icon" src={AddContactIcon} />
          <h4 className="title title--h4">Create new contact</h4>
        </Button>
      </div>
      <CreateContactForm
        ref={ref}
        doReset={isFormReset}
        setDoReset={setIsFormReset}
      />
    </>
  );
}

export default CreateContact;
