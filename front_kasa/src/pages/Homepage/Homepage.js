import React, { useState, useContext } from "react";
import styles from "./Homepage.module.scss";
import TOP_CONTENT from "../../assets/images/Top_Content_Img.png";
import Rental from "./components/Rental/Rental";
import Loading from "../../components/Loading/Loading";
import Search from "./components/Search/Search";
import { ApiContext } from "../../context/ApiContext";
import { useFetchData } from "../../hooks";
// import { data } from "../../data/rentals"; *********** A garder si besoin de montrer comme demandé dans le projet

export default function Homepage() {
  // const rentals = data; *********** A garder si besoin de montrer comme demandé dans le projet
  const [filter, setFilter] = useState("");
  const BASE_URL_API = useContext(ApiContext);
  const [[rentals, setRentals, isLoading]] = useFetchData(BASE_URL_API); // récupération du fetch depuis le HOOKS

  // fonction pour la mise à jour du like sur les cards
  function updateRental(updatedRental) {
    setRentals(
      rentals.map((r) => (r.id === updatedRental.id ? updatedRental : r))
    );
  }

  function deleteRental(id) {
    setRentals(rentals.filter((r) => r.id !== id));
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
              .filter((r) => r.title.toLowerCase().includes(filter)) // paramétrage de la barre de recherche
              .map((r) => (
                <Rental
                  key={r.id}
                  rental={r}
                  deleteRental={deleteRental}
                  toggleLikedRental={updateRental}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
