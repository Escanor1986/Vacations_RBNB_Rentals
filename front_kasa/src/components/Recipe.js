import { useState } from "react";
import styles from "./Recipe.module.scss";

function Recipe({ id, title, cover }) {
  const [liked, setLiked] = useState(false);

  function handleClick() {
    setLiked(!liked);
  }

  return (
    <div onClick={handleClick} className={styles.recipe}>
      <div className={styles.imageContainer}>
        <img src={cover} alt="recipe" />
        <div
          className={`${styles.recipeTitle} d-flex flex-row justify-content-between align-items-center`}
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

export default Recipe;
