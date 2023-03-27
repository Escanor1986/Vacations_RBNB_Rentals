import React from "react";
import styles from "./FicheLogement.module.scss";
import { useLoaderData } from "react-router-dom";

export default function FicheLogement() {
  const rental = useLoaderData(); // Récupère les données de la location

  // Vérifie que les données ont été chargées avant de les utiliser
  if (!rental) {
    return <div>Chargement...</div>;
  }

  // Utilise les données de la location pour afficher son titre et sa description
  return (
    <div className={styles.container}>
      <h1>{rental.title}</h1>
      <p>{rental.description}</p>
    </div>
  );
}
