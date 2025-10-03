const RENTAL_API = "https://housewaylion-4194c4829bc2.herokuapp.com/api/products";

// getRentals est exporté vers hooks/useFetchRentals.js

function getAuthToken() {
  return localStorage.getItem("token");
}


// Fonction pour effectuer l'appel API de login
export async function login(email, password) {
  try {
    const response = await fetch("https://housewaylion-4194c4829bc2.herokuapp.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const { token } = await response.json();
    return token;
  } catch (error) {
    throw new Error("Failed to login: " + error.message);
  }
}


// Fonction pour effectuer l'appel API de signup
export async function signup(email, password) {
  try {
    const response = await fetch("https://housewaylion-4194c4829bc2.herokuapp.com/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
    return "Signup successful!";
  } catch (error) {
    throw new Error("Failed to signup: " + error.message);
  }
}



// fonction pour l'affichage de toutes les locations'
export async function getRentals(queryParam) {
  const response = await fetch(
    `${RENTAL_API}${queryParam ? `?${queryParam}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );
  if (response.ok) {
    const body = await response.json();
    console.log("Liste des locations chargée avec succès !");
    //  la fonction vérifie si le corps de la réponse est déjà un tableau
    // Sinon, le corps de la réponse est enveloppé dans un tableau et renvoyé
    return Array.isArray(body) ? body : [body];
  } else {
    throw new Error("Error fetch Rentals");
  }
}

// fonction pour l'affichage d'une seule location
export async function getRental(_id) {
  const response = await fetch(`${RENTAL_API}/${_id}`,
  {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }
  );
  if (response.ok) {
    console.log(`Location : ${_id} chargée avec succès !`);
    return response.json();
  } else {
    throw new Error("Error fetch get one rental");
  }
}

// fonction pour l'affichage de la location suivante
export async function getNextRentalId(currentRentalId) {
  try {
    const response = await fetch(`${RENTAL_API}/next/${currentRentalId}`);
    if (response.ok) {
      console.log("Location suivante chargée avec succès !");
      const data = await response.json();
      return data.nextRentalId;
    } else {
      console.error("Error fetching next rental ID");
    }
  } catch (error) {
    console.error("Error fetching next rental ID:", error);
  }
}

// fonction pour l'affichage de la location précédente
export async function getPreviousRentalId(currentRentalId) {
  try {
    const response = await fetch(`${RENTAL_API}/previous/${currentRentalId}`);
    if (response.ok) {
      console.log("Location précédente chargée avec succès !");
      const data = await response.json();
      return data.previousRentalId;
    } else {
      console.error("Error fetching previous rental ID");
    }
  } catch (error) {
    console.error("Error fetching previous rental ID:", error);
  }
}

// fonction pour la suppression d'une location
export async function deleteRental(_id) {
  const response = await fetch(`${RENTAL_API}/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (response.ok) {
    console.log(`Location supprimée : ${_id} !`);
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
      Authorization: `Bearer ${getAuthToken()}`,

    },
    body: JSON.stringify(restRental),
  });
  if (response.ok) {
    console.log(`Liked mis à jour pour le produit : ${_id} !`);
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
      Authorization: `Bearer ${getAuthToken()}`,

    },
    body: JSON.stringify(restRental),
  });
  if (response.ok) {
    console.log(`Location mise à jour pour le produit : ${_id} !`);
    return response.json();
  } else {
    throw new Error("Error fetch update rental");
  }
}

// fonction pour la création d'une location
export async function createRental(newRental) {
  console.log(newRental);
  const response = await fetch(RENTAL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,

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
