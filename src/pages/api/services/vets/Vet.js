const api = process.env.NEXT_PUBLIC_API_URL;

export async function createVet(vetData) {
  try {
    const response = await fetch(`${api}/vets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vetData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Error.";
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error("Error create vet:", error.message);
    throw error;
  }
}

export async function getAllVets(accessToken) {
  try {
    const response = await fetch(`${api}/vets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Error.";
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error("Error fetching vets:", error.message);
    throw error;
  }
}
