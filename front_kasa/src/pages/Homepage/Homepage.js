import React, { useState, useContext } from "react";
import styles from "./Homepage.module.scss";
import TOP_CONTENT from "../../assets/images/Top_Content_Img.png";
import Rental from "./components/Rental/Rental";
import Loading from "../../components/Loading/Loading";
import Search from "./components/Search/Search";
import { ApiContext } from "../../context/ApiContext";
import { useFetchData } from "../../hooks";
import { NavLink } from "react-router-dom";
// import { data } from "../../data/rentals"; *********** A garder si besoin de montrer comme demandé dans le projet

export default function Homepage() {
  // const rentals = data; *********** A garder si besoin de montrer comme demandé dans le projet
  const [filter, setFilter] = useState("");
  const BASE_URL_API = useContext(ApiContext);
  const [isHovered, setIsHovered] = useState(false);
  const [[rentals, setRentals, isLoading]] = useFetchData(BASE_URL_API); // récupération du fetch depuis le HOOKS

  // fonction pour la mise à jour du like sur les cards
  async function updateRental(updatedRental) {
    try {
      const response = await fetch(
        `${BASE_URL_API}/rentals/${updatedRental.id}/like`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRental),
        }
      );
      if (response.ok) {
        const updatedRental = await response.json();
        setRentals(
          rentals.map((r) => (r.id === updatedRental.id ? updatedRental : r))
        );
        console.log('"Liked" mis à jour !'); // le serveur répond également avec succès
      }
    } catch (e) {
      console.log("Erreur");
    }
  }

  async function deleteRental(id) {
    try {
      const response = await fetch(`${BASE_URL_API}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRentals(rentals.filter((r) => r.id !== id));
      }
    } catch (e) {
      console.log("Erreur lors de la suppression de la location !");
    }
  }

  return (
    <div className="flex-fill container d-flex flex-column p-30">
      <div className={`my-40 ${styles.mainImageContainer}`}>
        <img
          className={`${styles.mainImage}`}
          src={TOP_CONTENT}
          alt="Top Content"
        />
        <span className={` d-flex  ${styles.imgTitle}`}>
          Chez vous, partout et ailleurs
        </span>
      </div>
      <div
        className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}
      >
        <Search setFilter={setFilter} />
        {isLoading && !rentals.length ? (
          <Loading />
        ) : (
          <div className={styles.grid}>
            {rentals
              .filter((r) => r.title.toLowerCase().includes(filter))
              .map((r) => (
                <div
                  key={r.id}
                  className={styles.rentalContainer}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className={styles.rentalWrapper}>
                    <Rental
                      rental={r}
                      deleteRental={deleteRental}
                      updateRental={updateRental}
                    />
                  </div>
                  {isHovered && (
                    <div className={styles.link}>
                      <NavLink to={`/fiche/${r.id}`} className={styles.link}>
                        <i className="fa-solid fa-eye fa-beat-fade"></i>
                      </NavLink>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
