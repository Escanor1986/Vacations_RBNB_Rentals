import { useEffect, useState } from "react";

export function useFetchData(url) {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);

  useEffect(() => {
    let cancel = false;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (response.ok && !cancel) {
          const newData = await response.json();
          setdata(Array.isArray(newData) ? newData : [newData]);
        }
      } catch (error) {
        setError("Erreur lors du chargement des données :", error.message);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  return [[data, setdata], isLoading, error];
}
