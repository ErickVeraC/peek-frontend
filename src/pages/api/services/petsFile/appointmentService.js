const api = process.env.NEXT_PUBLIC_API_URL;

export async function getAppointmentsByPetId(petId) {
  try {
    const token = localStorage.getItem("access-token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${api}/pets/${petId}/appointments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Error fetching appointments.";
      throw new Error(errorMessage);
    }

    return data.data.appointments;
  } catch (error) {
    console.error("Error getAppointmentsByPetId:", error.message);
    throw error;
  }
}

export async function getAllAppointmentsByOwner(ownerId) {
  try {
    const token = localStorage.getItem("access-token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${api}/owner/${ownerId}`, {
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
    console.error("Error fetching appointments:", error.message);
    throw error;
  }
}

export async function createAppointment(appointmentData) {
  try {
    const token = localStorage.getItem("access-token");
    if (!token) {
      throw new Error("No access token found");
    }

    console.log("Sending appointment data:", appointmentData);

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
