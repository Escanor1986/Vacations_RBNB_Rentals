import React, { useState } from "react";
import styles from "./FicheLogement.module.scss";
import { useLoaderData } from "react-router-dom";
import Dropdown from "./components/Dropdown";
import Rating from "./components/Rating";
import Left_Arrow from "../../assets/images/LEFT_ARROW.png";
import Right_Arrow from "../../assets/images/RIGHT_ARROW.png";

export default function FicheLogement() {
  const rental = useLoaderData(); // Récupère les données de la location
  const [currentSlide, setCurrentSlide] = useState(0); // Ajout d'un état pour stocker l'index du slide courant

  // Vérifie que les données ont été chargées avant de les utiliser
  if (!rental) {
    return <div>Chargement...</div>;
  }

  // Utilise les données de la location pour afficher son titre et sa description
  return (
    <div className="mx-40 flex-fill d-flex flex-column">
      <div className={`mt-40 mb-20 ${styles.mainImageContainer}`}>
        <button
          className={` ${styles.arrowButtonLeft}`}
          onClick={() =>
            setCurrentSlide(
              currentSlide === 0 ? rental.pictures.length - 1 : currentSlide - 1
            )
          }
        >
          <img
            src={Left_Arrow}
            alt="Vector Arrow Side Sliding"
            className={`${styles.arrow}`}
          />
        </button>
        <img
          src={rental.pictures[currentSlide]} // Affiche l'image du slide courant
          alt="Top Content"
          className={`${styles.mainImage}`}
        />
        <button
          className={` ${styles.arrowButtonRight}`}
          onClick={() =>
            setCurrentSlide(
              currentSlide === rental.pictures.length - 1 ? 0 : currentSlide + 1
            )
          }
        >
          <img
            src={Right_Arrow}
            alt="Vector Arrow Side Sliding"
            className={`${styles.arrow}`}
          />
        </button>
      </div>
      <div className={`${styles.rentalBox}`}>
        <div className={`d-flex flex-column  ${styles.leftBox}`}>
          <h1>{rental.title}</h1>
          <h3>{rental.location}</h3>
          <div>
            <span className={`mt-20 d-flex flex-row justify-content-start`}>
              {rental.tags.map((tags) => (
                <div
                  className={`mr-15 d-flex flex-row justify-content-center align-items-center`}
                  key={tags}
                >
                  {tags}
                </div>
              ))}
            </span>
          </div>
        </div>
        <div className={`${styles.rightBox}`}>
          <div
            className={`d-flex flex-row justify-content-start align-items-center`}
          >
            <h3>{rental.host.name}</h3>
            <img src={rental.host.picture} alt="host" />
          </div>
          <div className={`d-flex flex-row justify-content-start`}>
            <Rating />
          </div>
        </div>
      </div>
      <div className={`${styles.detailDropDownContainer}`}>
        <div
          className={`flex-fill d-flex ${styles.leftDetailDropDownContainer}`}
        >
          <Dropdown title="Description" content={rental.description} />
        </div>
        <div
          className={`flex-fill d-flex ${styles.rightDetailDropDownContainer}`}
        >
          <Dropdown
            title="Equipements"
            content={rental.equipments.map((equipment) => (
              <div key={equipment}>{equipment}</div>
            ))}
          />
        </div>
      </div>
    </div>
  );
}
