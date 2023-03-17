import React, { useState, useEffect, useContext } from "react";
import styles from "./Homepage.module.scss";
import TOP_CONTENT from "../../assets/images/Top_Content_Img.png";
import Rental from "./components/Rental/Rental";
import Loading from "../../components/Loading/Loading";
import { ApiContext } from "../../context/ApiContext";
// import { data } from "../../data/rentals"; *********** A garder si besoin de montrer comme demandé dans le projet

export default function Homepage() {
  // const rentals = data; *********** A garder si besoin de montrer comme demandé dans le projet
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const BASE_URL_API = useContext(ApiContext);

  useEffect(() => {
    // déclaration de cette variable qui sera utilisée pour vérifier si le chargement des données depuis l'api
    // est encore nécessaire, de fait, l'usage du loader au chargement.
    let cancel = false;
    async function fetchRentals() {
      try {
        setIsLoading(true);
        const response = await fetch(BASE_URL_API);
        if (response.ok && !cancel) {
          // donc ici SI cancel est true
          const rentals = await response.json();
          setRentals(Array.isArray(rentals) ? rentals : [rentals]);
        }
      } catch (e) {
        console.log("Erreur lors du chargement des données");
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }
    fetchRentals();
    return () => (cancel = true);
  }, [BASE_URL_API]);

  function handleInput(e) {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase()); // ici la méthode "trim()" permet de retirer les espaces vide dans la chaîne de caractère
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
        {isLoading && !rentals.length ? (
          <Loading />
        ) : (
          <div className={styles.grid}>
            {rentals
              .filter((r) => r.title.toLowerCase().startsWith(filter))
              .map((r) => (
                <Rental key={r.id} title={r.title} cover={r.cover} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
