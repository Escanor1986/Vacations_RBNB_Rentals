const RENTAL_API = "http://localhost:4000/api/products";

// getRentals est exporté vers hooks/useFetchRentals.js

// fonction pour l'affichage de toutes les locations'
export async function getRentals(queryParam) {
  const response = await fetch(
    `${RENTAL_API}${queryParam ? `?${queryParam}` : ""}`
  );
  if (response.ok) {
    const body = await response.json();
    console.log("Liste des locations chargée avec succès !");
    return Array.isArray(body) ? body : [body];
  } else {
    throw new Error("Error fetch Rentals");
  }
}

// fonction pour l'affichage d'une seule location
export async function getRental(_id) {
  const response = await fetch(`${RENTAL_API}/${_id}`);
  if (response.ok) {
    console.log("Location chargée avec succès !");
    return response.json();
  } else {
    throw new Error("Error fetch get one rental");
  }
}

// fonction pour la suppression d'une location
export async function deleteRental(_id) {
  const response = await fetch(`${RENTAL_API}/${_id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    console.log("Location supprimée !");
    return _id;
  } else {
    throw new Error("Error fetch delete rental");
  }
}

// fonction pour la mise à jour du like sur les cards
export async function updateLikeRental(updatedRental) {
  const { _id, ...restRental } = updatedRental;
  const response = await fetch(`${RENTAL_API}/${updatedRental._id}/like`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restRental),
  });
  if (response.ok) {
    console.log('"Liked" mis à jour !');
    return response.json();
  } else {
    throw new Error("Error fetch update rental");
  }
}

// fonction pour la mise à jour du like sur les cards
export async function updateRental(updatedRental) {
  const { _id, ...restRental } = updatedRental;
  const response = await fetch(`${RENTAL_API}/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restRental),
  });
  if (response.ok) {
    console.log("Location mise à jour !");
    return response.json();
  } else {
    throw new Error("Error fetch update rental");
  }
}

// fonction pour la création d'une location
export async function createRental(newRental) {
  const response = await fetch(RENTAL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRental),
  });
  if (response.ok) {
    console.log("Location créée !");
    return response.json();
  } else {
    throw new Error("Error fetch create rental");
  }
}
