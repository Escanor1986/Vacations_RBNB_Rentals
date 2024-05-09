import React from "react";
import styles from "../FicheLogement.module.scss";

function Dropdown({ title, content }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const chevronIcon = isOpen ? (
    <i className="fa-solid fa-chevron-up"></i>
  ) : (
    <i className="fa-solid fa-chevron-down"></i>
  );

  return (
    <div className={`flex-fill d-flex flex-column ${styles.dropDownContainer}`}>
      <button
        className={`d-flex justify-content-between align-items-center ${styles.dropDownButton}`}
        onClick={toggleOpen}
      >
        {title}
        <span className={styles.chevronContainer}>{chevronIcon}</span>
      </button>
      {isOpen && <div className={` ${styles.dropDownContent}`}>{content}</div>}
    </div>
  );
}

export default Dropdown;
