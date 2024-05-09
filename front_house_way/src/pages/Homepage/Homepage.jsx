import React, { useState } from "react";
import styles from "./Homepage.module.scss";
import TOP_CONTENT from "../../assets/images/Top_Content_img_3.png";
import Rental from "./components/Rental/Rental";
import Loading from "../../components/Loading/Loading";
import Search from "./components/Search/Search";
import { useFetchRentals } from "../../hooks";
import { NavLink } from "react-router-dom";
import {
  updateLikeRental as updateLikeR,
  deleteRental as deleteR,
} from "../../apis";
// import { data } from "../../data/rentals"; *********** A garder si besoin de montrer comme demandé dans le projet

export default function Homepage() {
  // const rentals = data; *********** A garder si besoin de montrer comme demandé dans le projet
  const [filter, setFilter] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [[rentals, setRentals, isLoading]] = useFetchRentals(); // récupération du fetch depuis le HOOKS

  // fonction pour la mise à jour du like sur les cards (récupéré depuis ../../apis)
  async function updateLikeRental(updatedLikeRental) {
    const savedLikeRental = await updateLikeR(updatedLikeRental);
    setRentals(
      rentals.map(r => (r._id === savedLikeRental._id ? savedLikeRental : r))
    );
  }

  // fonction pour la suppression d'une location (récupéré depuis ../../apis)
  async function deleteRental(_id) {
    await deleteR(_id);
    setRentals(rentals.filter(r => r._id !== _id));
  }

  return (
    <div className="flex-fill container d-flex flex-column align-items-center p-30">
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
        className={`card flex-fill d-flex flex-column align-items-center p-20 mb-20 ${styles.contentCard}`}
      >
        <Search setFilter={setFilter} />
        {isLoading && !rentals.length ? (
          <Loading />
        ) : (
          <div className={`mt-15 ${styles.grid}`}>
            {rentals
              .filter(rental => rental.title.toLowerCase().includes(filter))
              .map(rental => (
                <div
                  key={rental._id}
                  className={styles.rentalContainer}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className={styles.rentalWrapper}>
                    <Rental
                      rental={rental}
                      deleteRental={deleteRental}
                      updateLikeRental={updateLikeRental}
                    />
                  </div>
                  {isHovered && (
                    <div className={styles.link}>
                      <NavLink
                        to={{
                          pathname: `/fiche/${rental._id}`,
                          state: { id: rental._id },
                        }}
                        className={styles.link}
                      >
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
