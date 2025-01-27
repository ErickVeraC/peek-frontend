const api = process.env.NEXT_PUBLIC_API_URL;

export async function createVaccine(vaccineData) {
  try {
    const token = localStorage.getItem("access-token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${api}/vaccines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(vaccineData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Error creating vaccine.";
      throw new Error(errorMessage);
    }

    return data.data.vaccine;
  } catch (error) {
    console.error("Error createVaccine:", error.message);
    throw error;
  }
}

export async function editVaccine(vaccineId, vaccineData) {
  try {
    const token = localStorage.getItem("access-token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${api}/vaccines/${vaccineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(vaccineData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Error updating vaccine.";
      throw new Error(errorMessage);
    }

    return data.data.vaccine;
  } catch (error) {
    console.error("Error editVaccine:", error.message);
    throw error;
  }
}

export async function deleteVaccine(vaccineId) {
  try {
    const token = localStorage.getItem("access-token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${api}/vaccines/${vaccineId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Error deleting vaccine.";
      throw new Error(errorMessage);
    }

    return data.data.vaccine;
  } catch (error) {
    console.error("Error deleteVaccine:", error.message);
    throw error;
  }
}
