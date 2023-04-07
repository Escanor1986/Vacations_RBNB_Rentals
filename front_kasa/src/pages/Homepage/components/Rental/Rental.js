import styles from "./Rental.module.scss";

function Rental({ rental, updateLikeRental, deleteRental }) {
  function handleClickLike() {
    updateLikeRental({
      ...rental,
      liked: !rental.liked,
    });
  }

  async function handleClickDelete(e) {
    // la stop la propagation car nous sommes déjà à l'intérieur d'un élément pour lequel l'on écoute un évènement
    e.stopPropagation();
    deleteRental(rental._id);
  }

  return (
    <div onClick={handleClickLike} className={styles.rental}>
      <i onClick={handleClickDelete} className="fa-solid fa-xmark"></i>
      <div className={styles.imageContainer}>
        <img src={rental.cover} alt="rental" />
        <div
          className={`${styles.rentalTitle} d-flex flex-row justify-content-between align-items-center`}
        >
          <h3 className="mr-15">{rental.title}</h3>
          <i
            className={` fa-solid fa-heart ${
              rental.liked ? "text-primary" : ""
            } `}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Rental;
