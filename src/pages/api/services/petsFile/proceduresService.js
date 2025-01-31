const api = process.env.NEXT_PUBLIC_API_URL;

export async function createProcedure(procedureData) {
  try {
    const token = localStorage.getItem("access-token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${api}/clinicalProcedures`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(procedureData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.message || "Server error during creation of clinical procedure";
      throw new Error(errorMessage);
    }

    return data.data.clinicalProcedure;
  } catch (error) {
    console.error(
      "Server error during creation of clinical procedure",
      error.message
    );
    throw error;
  }
}
