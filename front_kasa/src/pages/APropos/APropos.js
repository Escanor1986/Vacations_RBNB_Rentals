// eslint-disable-next-line
import React, { useState } from "react";
import styles from "./APropos.module.scss";
import TOP_CONTENT from "../../assets/images/Top_Content_Img_1.png";
import Dropdown from "./components/Dropdown";

function PageWithDropdowns() {
  return (
    <div className="mx-40 container flex-fill d-flex flex-column justify-content-center align-items-center">
      <div className={`mt-40 mb-20 ${styles.mainImageContainer}`}>
        <img
          src={TOP_CONTENT}
          alt="Top Content"
          className={`${styles.mainImage}`}
        />
      </div>
      <div
        className={`mb-20 flex-fill d-flex flex-column justify-content-center align-items-center ${styles.dropDownContainer}`}
      >
        <Dropdown
          title="Fiabilité"
          content="Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes aux logements, et toutes les informations sont régulièrement vérifiées  par nos équipes."
        />
        <Dropdown
          title="Respect"
          content="La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme."
        />
        <Dropdown
          title="Service"
          content="Nos équipes se tiennent à votre disposition pour vous fournir une expérience parfaite. N'hésitez pas à nous contacter si vous avez la moindre question."
        />
        <Dropdown
          title="Sécurité"
          content="La sécurité est la priorité de Kasa. Aussi bien pour nos hôtes que pour les voyageurs, chaque logement correspond aux critères de sécurité établis par nos services. En laissant une note aussi bien à l'hôte qu'au locataire, cela permet à nos équipes de vérifier que les standards sont bien respectés. Nous organisons également des ateliers sur la sécurité domestique pour nos hôtes."
        />
      </div>
    </div>
  );
}

export default PageWithDropdowns;
