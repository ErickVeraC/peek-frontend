const api = process.env.NEXT_PUBLIC_API_URL;

export async function createAppointment(appointmentData) {
  try {
    const token = localStorage.getItem("access-token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${api}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(appointmentData),
    });

    const data = await response.json();

    console.log("Backend response:", data);

    if (!response.ok) {
      const errorMessage = data.message || "Error creating appointment.";
      throw new Error(errorMessage);
    }

    return data.data.appointment;
  } catch (error) {
    console.error("Error createAppointment:", error.message);
    throw error;
  }
}

export async function updateAppointment(appointmentId, appointmentData) {
  try {
    const token = localStorage.getItem("access-token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${api}/appointments/${appointmentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(appointmentData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Error updating appointment.";
      throw new Error(errorMessage);
    }

    return data.data.appointment;
  } catch (error) {
    console.error("Error updateAppointment:", error.message);
    throw error;
  }
}

export async function deleteAppointment(appointmentId) {
  try {
    const token = localStorage.getItem("access-token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${api}/appointments/${appointmentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Error deleting appointment.";
      throw new Error(errorMessage);
    }

    return data.data.appointment;
  } catch (error) {
    console.error("Error deleteAppointment:", error.message);
    throw error;
  }
}
