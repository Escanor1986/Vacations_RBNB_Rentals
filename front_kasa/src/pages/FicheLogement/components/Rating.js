import React from "react";
import styles from "../FicheLogement.module.scss";
import { useLoaderData } from "react-router-dom";

function Rating() {
  const rental = useLoaderData(); // Récupère les données de la location

  return (
    <div className={styles.ratingContainer}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={
            index < rental.rating
              ? `${styles.star} ${styles.active}`
              : styles.star
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default Rating;
