const api = process.env.NEXT_PUBLIC_API_URL;

export async function createUser(userData) {
  try {
    const response = await fetch(`${api}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Error.";
      throw new Error(errorMessage);
    }
    return data;
  } catch (error) {
    console.error("Error createAccount:", error.message);
    throw error;
  }
}

export async function getUser(userId) {
  try {
    const response = await fetch(`${api}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Error.";
      throw new Error(errorMessage);
    }
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${api}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid credentials");
      }
      throw new Error("Server error");
    }

    const data = await response.json();
    const token = data?.data?.token;
    if (!token) {
      throw new Error("Invalid response");
    }

    return { token, userId: data?.data?.userId };
  } catch (error) {
    console.error("Hubo un error en loginUser:", error.message);
    throw error;
  }
}

export async function updateUser(id, userData) {
  const token = localStorage.getItem("access-token");
  if (!token) {
    throw new Error("No access token found");
  }

  try {
    const response = await fetch(`${api}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Error.";
      throw new Error(errorMessage);
    }
    return data;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
}
