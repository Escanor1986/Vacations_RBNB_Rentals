import { useState } from "react";
import styles from "./WishList.module.scss";
import TOP_CONTENT from "../../assets/images/Top_Content_img_5.png";
import Rental from "../Homepage/components/Rental/Rental";
import Loading from "../../components/Loading/Loading";
import Search from "../Homepage/components/Search/Search";
import { useFetchRentals } from "../../hooks";
import { deleteRental as deleteR } from "../../apis";
import { updateLikeRental as updateLikeR } from "../../apis";
import { NavLink } from "react-router-dom";

function WishList() {
  const [filter, setFilter] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [[rentals, setRentals, isLoading]] = useFetchRentals(); // récupération du fetch depuis le HOOKS

  async function updateLikeRental(updatedLikeRental) {
    const savedLikeRental = await updateLikeR(updatedLikeRental);
    setRentals(
      rentals.map(r => (r._id === savedLikeRental._id ? savedLikeRental : r))
    );
  }

  async function deleteRental(_id) {
    await deleteR(_id);
    setRentals(rentals.filter(r => r._id !== _id));
  }

  return (
    <div className="mx-40 container flex-fill d-flex flex-column align-items-center">
      <div className={`mt-40 mb-20 ${styles.mainImageContainer}`}>
        <img
          src={TOP_CONTENT}
          alt="Top Content"
          className={`${styles.mainImage}`}
        />
      </div>
      <div
        className={`mb-20 flex-fill d-flex flex-column align-items-center ${styles.dropDownContainer}`}
      >
        <h1>WishLists</h1>
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
                .map(rental =>
                  rental.liked === true ? (
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
                  ) : null
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WishList;
