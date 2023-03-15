import React, { useState } from "react";
import styles from "./Content.module.scss";
import TOP_CONTENT from "../assets/images/Top_Content_Img.png";
import Recipe from "./Recipe";
import { data } from "../data/recipes";

function Content() {
  const recipes = data;
  const [currentPage, setCurrentPage] = useState(1);

  const recipesPerPage = 6;
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;

  const currentRecipes = recipes.slice(startIndex, endIndex);

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
      <div className={`card p-20 ${styles.contentCard}`}>
        <div className={styles.grid}>
          {currentRecipes.map((r) => (
            <Recipe key={r.id} title={r.title} cover={r.cover} />
          ))}
        </div>

        {/* Début de la pagination */}

        <div className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={` ${styles.pageButton} ${
                i + 1 === currentPage ? "active" : ""
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Fin de la pagination */}
      </div>
    </div>
  );
}

export default Content;

/* On utilise le hook useState pour stocker le numéro de page actif (currentPage). 
La constante recipesPerPage indique le nombre d'éléments à afficher par page et la constante 
totalPages est calculée à partir de la longueur du tableau recipes et du nombre d'éléments par page.
La fonction handlePageChange est appelée lorsqu'un bouton de pagination est cliqué et 
met à jour le numéro de page actif.

Les constantes startIndex et endIndex calculent les index de début et de fin de la tranche 
à afficher dans le tableau recipes. La constante currentRecipes est un tableau contenant les éléments à afficher pour la page actuelle.
Enfin, la pagination est générée à l'aide d'une boucle map sur un tableau de la même longueur 
que le nombre total de pages. Chaque bouton de pagination appelle la fonction handlePageChange
avec le numéro de page correspondant. Le bouton correspondant à la page actuelle est mis en surbrillance avec la classe "active". */
