import { NavLink } from "react-router-dom";
import styles from "./AdminRentalsNav.module.scss";

function AdminRentalsNav() {
  return (
    <ul className={styles.list}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="list"
      >
        Liste des locations
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="new"
      >
        Ajouter une location
      </NavLink>
    </ul>
  );
}

export default AdminRentalsNav;
