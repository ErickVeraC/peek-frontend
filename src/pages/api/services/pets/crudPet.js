const api = process.env.NEXT_PUBLIC_API_URL;

//Obtener mascota unica
export async function getPet(id) {
  const token = localStorage.getItem("access-token");

  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch(`${api}/pets/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Pet not found");
    } else if (response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("Server error");
    }
  }

  const data = await response.json();
  return data.data.pet;
}

//Editar mascota unica
export async function editPet(id, petData) {
  const token = localStorage.getItem("access-token");
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch(`${api}/pets/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(petData),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Pet not found");
    } else if (response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("Server error");
    }
  }

  const data = await response.json();
  return data;
}

//Eliminar mascota unica
export async function deletePet(id) {
  const token = localStorage.getItem("access-token");
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch(`${api}/pets/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Pet not found");
    } else if (response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("Server error");
    }
  }

  return { message: "Pet deleted successfully" };
}

export async function getAllPetsByVet(vetId) {
  try {
    const token = localStorage.getItem("access-token");
    const storedId = localStorage.getItem("access-id");

    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${api}/pets/vet/${vetId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data.message || "Error fetching pets.";
      throw new Error(errorMessage);
    }
    // Actualizar el token en localStorage si se proporciona un nuevo token
    if (data.newToken) {
      localStorage.setItem("access-token", data.newToken);
    }
    return data.data.pets;
  } catch (error) {
    console.error("Error getAllPets:", error.message);
    throw error;
  }
}

export async function getClinicalProcedures(petId) {
  try {
    const token = localStorage.getItem("access-token");
    const storedId = localStorage.getItem("access-id");

    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${api}/clinicalProcedures`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const data = await response.json();
    //alert(JSON.stringify(data));
    if (!response.ok) {
      const errorMessage =
        data.message || "Error fetching clinical procedures.";
      throw new Error(errorMessage);
    }
    // Actualizar el token en localStorage si se proporciona un nuevo token
    if (data.newToken) {
      localStorage.setItem("access-token", data.newToken);
    }
    return data.data.clinicalProcedures;
  } catch (error) {
    console.error("Error getAllPets:", error.message);
    throw error;
  }
}
