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
        const queryParam = new URLSearchParams();
        // on importe fetch depuis ../apis/rentals.js
        const fetchedRentals = await getRentals(queryParam);
        if (!cancel) {
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
    return () => {
      cancel = true;
    };
  }, []);

  return [[rentals, setRentals], isLoading, error];
}
