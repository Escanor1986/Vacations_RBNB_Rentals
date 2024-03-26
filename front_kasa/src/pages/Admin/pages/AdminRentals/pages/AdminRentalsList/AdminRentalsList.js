import { useFetchRentals } from "../../../../../../hooks";
import styles from "./AdminRentalsList.module.scss";
import { deleteRental as deleteR } from "../../../../../../apis";
import { NavLink } from "react-router-dom";

function AdminRentalsList() {
  const [[rentals, setRentals]] = useFetchRentals();

  async function deleteRental(_id) {
    await deleteR(_id);
    setRentals(rentals.filter(r => r._id !== _id));
  }

  return (
    <ul className={styles.list}>
      {rentals.length
        ? rentals.map(r => (
            <li key={r._id} className="d-flex align-items-center">
              <NavLink
                to={{
                  pathname: `/fiche/${r._id}`,
                  state: { id: r._id },
                }}
                className={styles.link}
              >
                <img src={r.cover} alt="main cover" />
              </NavLink>
              <span className="flex-fill">{r.title}</span>
              <NavLink to={`../edit/${r._id}`}>
                <span className="d-flex mr-15">
                  <button
                    className={`${styles.cbutton} ${styles["c-button--gooey"]}`}
                  >
                    Editer
                    <div className={`${styles["c-button__blobs"]}`}>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    style={{ display: "block", height: "0", width: "0" }}
                  >
                    <defs>
                      <filter id="goo">
                        <feGaussianBlur
                          in="SourceGraphic"
                          stdDeviation="10"
                          result="blur"
                        ></feGaussianBlur>
                        <feColorMatrix
                          in="blur"
                          mode="matrix"
                          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                          result="goo"
                        ></feColorMatrix>
                        <feBlend in="SourceGraphic" in2="goo"></feBlend>
                      </filter>
                    </defs>
                  </svg>
                </span>
              </NavLink>
              <button
                onClick={() => deleteRental(r._id)}
                className={`${styles.button}`}
              >
                Supprimer
              </button>
            </li>
          ))
        : null}
    </ul>
  );
}

export default AdminRentalsList;
