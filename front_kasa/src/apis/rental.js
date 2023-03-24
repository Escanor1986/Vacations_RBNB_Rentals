const RENTAL_API = "http://localhost:4000/api/products";

// getRentals est exporté vers hooks/useFetchRentals.js
export async function getRentals(queryParam) {
  const response = await fetch(
    `${RENTAL_API}${queryParam ? `?${queryParam}` : ""}`
  );
  if (response.ok) {
    const body = await response.json();
    return Array.isArray(body) ? body : [body];
  } else {
    throw new Error("Error fetch Rentals");
  }
}
export async function getRental() {}

export async function deleteRental() {}

export async function updateRental() {}

export async function createRental() {}
