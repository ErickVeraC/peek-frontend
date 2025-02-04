export const testTransloaditConnection = async () => {
  const authKey = process.env.NEXT_PUBLIC_TRANSLOADIT_AUTH_KEY;
  const templateId = process.env.NEXT_PUBLIC_TRANSLOADIT_TEMPLATE_ID;

  // Verificar si las credenciales están definidas
  console.log("Auth Key:", authKey);
  console.log("Template ID:", templateId);

  if (!authKey || !templateId) {
    console.error("Error: Transloadit credentials are missing.");
    throw new Error("Transloadit credentials are not set");
  }

  // Construir los parámetros de la assembly.
  const assemblyParams = {
    auth: { key: authKey },
    template_id: templateId,
    steps: {
      ":original": {
        robot: "/upload/handle",
      },
    },
  };

  try {
    const response = await fetch("https://api2.transloadit.com/assemblies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        params: JSON.stringify(assemblyParams),
      }),
    });

    if (response.ok) {
      console.log("✅ Transloadit connection successful");
      return true;
    } else {
      const errorData = await response.json();
      console.error("❌ Transloadit connection failed", errorData);
      return false;
    }
  } catch (error) {
    console.error("🚨 Error connecting to Transloadit", error);
    return false;
  }
};
