import styles from "./Search.module.scss";

function Search({ setFilter }) {
  function handleInput(e) {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase()); // ici la méthode "trim()" permet de retirer les espaces vide dans la chaîne de caractère
  }

  return (
    <div
      className={`d-flex flex-row justify-content-center align-item-center my-30 ${styles.searchBar}`}
    >
      <i
        className={`fa-solid fa-magnifying-glass mr-15 ${styles.searchSymbol}`}
      ></i>
      <input
        onInput={handleInput}
        className="flex-fill"
        type="text"
        placeholder="Rechercher"
      />
    </div>
  );
}

export default Search;
