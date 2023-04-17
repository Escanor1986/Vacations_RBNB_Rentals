import { useEffect, useState } from "react";
import { getRentals } from "../apis";

export function useFetchRentals() {
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Création d'un objet URLSearchParams pour les paramètres de requête
        // facultatif dans ce cas précis (puisque pas de pagination, etc...)
        const queryParam = new URLSearchParams();
        const fetchedRentals = await getRentals(queryParam);
        if (!cancel) {
          // Mise à jour de l'état rentals avec les nouvelles données
          setRentals((x) => [...x, ...fetchedRentals]);
        }
      } catch (error) {
        setError(error);
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    };
    fetchData();

    // Fonction de nettoyage pour annuler les opérations de mise à jour de l'état lorsque
    // le composant est démonté avant la fin de la récupération des données
    return () => {
      cancel = true;
    };
  }, []); // Tableau de dépendances vide pour exécuter l'effet une fois au montage du composant

  // Retour des états et des fonctions de mise à jour pour les locations, le chargement et les erreurs
  return [[rentals, setRentals], isLoading, error];
}
