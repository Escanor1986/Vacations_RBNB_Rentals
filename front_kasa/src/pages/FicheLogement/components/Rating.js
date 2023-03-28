import React, { useState } from "react";
import styles from "../FicheLogement.module.scss";

function Rating({ rating, onChange }) {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleClick = (newRating) => {
    setCurrentRating(newRating);
    onChange(newRating);
  };

  return (
    <div className={styles.ratingContainer}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={
            index < currentRating
              ? `${styles.star} ${styles.active}`
              : styles.star
          }
          onClick={() => handleClick(index + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default Rating;
