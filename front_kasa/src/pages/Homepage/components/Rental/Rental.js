import { useContext } from "react";
import { ApiContext } from "../../../../context/ApiContext";
import styles from "./Rental.module.scss";

function Rental({
  rental: { id, title, liked, cover },
  toggleLikedRental,
  deleteRental,
}) {
  const BASE_URL_API = useContext(ApiContext);

  async function handleClickLike() {
    try {
      const response = await fetch(`${BASE_URL_API}/rentals/${id}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          liked: !liked,
        }),
      });
      if (response.ok) {
        const updatedRental = await response.json();
        toggleLikedRental(updatedRental);
        console.log('"Liked" mis à jour !'); // le serveur répond également avec succès
      }
    } catch (e) {
      console.log("Erreur");
    }
  }

  async function handleClickDelete(e) {
    // la stop la propagation car nous sommes déjà à l'intérieur d'un élément pour lequel l'on écoute un évènement
    e.stopPropagation();
    try {
      const response = await fetch(`${BASE_URL_API}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        deleteRental(id);
      }
    } catch (e) {
      console.log("Erreur lors de la suppression de la location !");
    }
  }

  return (
    <div onClick={handleClickLike} className={styles.rental}>
      <i onclick={handleClickDelete} className="fa-solid fa-xmark"></i>
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
