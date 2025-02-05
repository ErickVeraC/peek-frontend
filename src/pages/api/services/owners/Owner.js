const api = process.env.NEXT_PUBLIC_API_URL;

export async function createOwner(vetData) {
  try {
    const response = await fetch(`${api}/owners`, {
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

export async function getAllOwners() {
  try {
    const token = localStorage.getItem("access-token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${api}/owners`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Error.";
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error("Error fetching owners:", error.message);
    throw error;
  }
}
