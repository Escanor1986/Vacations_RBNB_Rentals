import styles from "./Rental.module.scss";

function Rental({ rental, updateLikeRental, deleteRental }) {
  function handleClickLike() {
    updateLikeRental({
      ...rental, // on utilise le spread operator pour effcetuer une shallow copy de rental
      liked: !rental.liked, // On y modifie ensuite "liked" dans la database
    });
  }

  async function handleClickDelete(e) {
    e.stopPropagation();
    deleteRental(rental._id);
  }

  return (
    <div onClick={handleClickLike} className={styles.rental}>
      <i onClick={handleClickDelete} className="fa-solid fa-xmark"></i>
      <div className={styles.imageContainer}>
        <img src={rental.cover} alt="rental" />
      </div>
      <div
        className={`${styles.rentalTitle} mt-15 p-10 d-flex flex-row justify-content-between align-items-start`}
      >
        <h3 className="mr-15">{rental.title}</h3>
        <i
          className={`fa-solid fa-heart font-s-25px ${
            rental.liked ? "text-primary font-s-40px" : ""
          } `}
        ></i>
      </div>
    </div>
  );
}

export default Rental;
