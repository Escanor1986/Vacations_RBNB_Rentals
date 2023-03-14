import styles from "./Recipe.module.scss";
import recipe from "../assets/images/card_image.webp";

function Recipe() {
  return (
    <div className={styles.recipe}>
      <div className={styles.imageContainer}>
        <img src={recipe} alt="recipe" />
      </div>
      <div
        className={`${styles.recipeTitle} d-flex flex-row justify-content-start align-items-center`}
      >
        <h3>Titre de la location</h3>
      </div>
    </div>
  );
}

export default Recipe;
