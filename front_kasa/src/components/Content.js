import React, { useState } from "react";
import styles from "./Content.module.scss";
import TOP_CONTENT from "../assets/images/Top_Content_Img.png";
import Recipe from "./Recipe";
import { data } from "../data/recipes";

function Content() {
  const recipes = data;
  const [currentPage, setCurrentPage] = useState(1);

  const recipesPerPage = 10;
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
        <div className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={i + 1 === currentPage ? "active" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Content;
