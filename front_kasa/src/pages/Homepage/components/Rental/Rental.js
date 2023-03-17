import { useState } from "react";
import styles from "./Rental.module.scss";

function Rental({ id, title, cover }) {
  const [liked, setLiked] = useState(false);

  function handleClick() {
    setLiked(!liked);
  }

  return (
    <div onClick={handleClick} className={styles.rental}>
      <div className={styles.imageContainer}>
        <img src={cover} alt="rental" />
        <div
          className={`${styles.rentalTitle} d-flex flex-row justify-content-between align-items-center`}
        >
          <h3 className="mr-15">{title}</h3>
          <i
            className={` fa-solid fa-heart ${liked ? "text-primary" : ""} `}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Rental;
