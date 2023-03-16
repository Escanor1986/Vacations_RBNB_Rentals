import React, { useState } from "react";
import styles from "./Content.module.scss";
import TOP_CONTENT from "../assets/images/Top_Content_Img.png";
import Recipe from "./Recipe";
import { data } from "../data/recipes";

export default function Content() {
  const recipes = data;
  const [filter, setFilter] = useState("");

  function handleInput(e) {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase()); // ici la méthode "trim()" permet de retirer les espaces vide dans la chaîne de caractère
  }

  return (
    <div className="flex-fill container p-20">
      <div className={`my-40 flex-fill ${styles.mainImageContainer}`}>
        <img
          className={`${styles.mainImage}`}
          src={TOP_CONTENT}
          alt="Top Content"
        />
        <span className={` d-flex  ${styles.imgTitle}`}>
          Chez vous, partout et ailleurs
        </span>
      </div>
      <div className={`card d-flex flex-column p-20 ${styles.contentCard}`}>
        {/* Début de la barre de recherche textuelle */}
        <div
          className={`d-flex flex-row justify-content-center align-item-center my-30 ${styles.searchBar}`}
        >
          <i className="fa-solid fa-magnifying-glass mr-15"></i>
          <input
            onInput={handleInput}
            className="flex-fill"
            type="text"
            placeholder="Rechercher"
          />
        </div>
        {/* Fin de la barre de recherche textuelle */}
        <div className={styles.grid}>
          {recipes
            .filter((r) => r.title.toLowerCase().includes(filter)) // Méthodes pour la barre de recherche
            .map((r) => (
              <Recipe key={r.id} title={r.title} cover={r.cover} />
            ))}
        </div>
      </div>
    </div>
  );
}
