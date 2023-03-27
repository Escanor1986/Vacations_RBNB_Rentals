import { useFetchRentals } from "../../../../../../hooks";
import styles from "./AdminRentalsList.module.scss";
import { deleteRental as deleteR } from "../../../../../../apis";
import { NavLink } from "react-router-dom";

function AdminRentalsList() {
  const [[rentals, setRentals]] = useFetchRentals();

  async function deleteRental(_id) {
    await deleteR(_id);
    setRentals(rentals.filter((r) => r._id !== _id));
  }

  return (
    <ul className={styles.list}>
      {rentals.length
        ? rentals.map((r) => (
            <li key={r._id} className="d-flex align-items-center">
              <img src={r.cover} alt="main cover" />
              <span className="flex-fill">{r.title}</span>
              <NavLink to={`../edit/${r._id}`}>
                <button className="btn btn-primary mr-15">Editer</button>
              </NavLink>
              <button
                onClick={() => deleteRental(r._id)}
                className="btn btn-danger"
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
