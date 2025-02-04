import { useState, useEffect } from "react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import Transloadit from "@uppy/transloadit";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

import { testTransloaditConnection } from "@/pages/api/services/testTransloaditConnection";

export default function ImageUploader({ onUpload }) {
  const [uppy, setUppy] = useState(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isValidTransloadit, setIsValidTransloadit] = useState(null); // Estado para saber si la conexión es válida

  useEffect(() => {
    // Verificar la conexión antes de inicializar Uppy
    testTransloaditConnection()
      .then((isValid) => {
        console.log("Transloadit connection:", isValid);
        setIsValidTransloadit(isValid);
      })
      .catch((err) => {
        console.error("Error testing Transloadit connection:", err);
        setIsValidTransloadit(false);
      });
  }, []);

  useEffect(() => {
    const uppyInstance = new Uppy({
      restrictions: { maxNumberOfFiles: 1 },
    })
      .use(Transloadit, {
        params: {
          auth: { key: process.env.NEXT_PUBLIC_TRANSLOADIT_AUTH_KEY },
          template_id: process.env.NEXT_PUBLIC_TRANSLOADIT_TEMPLATE_ID,
        },
        waitForEncoding: true,
      })
      .on("transloadit:complete", onCompleteUploadFiles)
      .on("transloadit:failed", (assembly) =>
        console.error("Transloadit assembly failed:", assembly)
      )
      .on("error", (error) => console.error("Uppy error:", error))
      .on("file-added", (file) => {
        console.log("File added:", file);
        setIsUploadingFile(true);
      });

    setUppy(uppyInstance);

    return () => {
      if (uppyInstance) uppyInstance.destroy();
    };
  }, [onUpload]);

  const onCompleteUploadFiles = (assembly) => {
    console.log("Transloadit complete:", assembly);

    if (!assembly || !assembly.results) {
      console.error(
        "Error: La respuesta de Transloadit no contiene 'results'.",
        assembly
      );
      return;
    }

    console.log("Assembly results:", assembly.results);

    // Validar que el paso "compress_image" existe en los resultados
    const compressImageResults = assembly.results.compress_image;
    if (!compressImageResults || compressImageResults.length === 0) {
      console.error(
        "Error: No se encontraron archivos comprimidos en Transloadit."
      );
      return;
    }

    // Intentar extraer la URL del primer archivo comprimido
    const url = compressImageResults[0]?.ssl_url;
    if (!url) {
      console.error(
        "Error: No se encontró una URL válida en los resultados de compress_image."
      );
      return;
    }

    setImageUrl(url);
    setIsUploadingFile(false);
    if (onUpload) {
      onUpload(url);
    }
  };

  return (
    <>
      <div className="container">
        {uppy ? (
          <>
            <Dashboard uppy={uppy} />
            <p>{isUploadingFile ? "Cargando" : "Exito de Carga"}</p>
            {imageUrl && (
              <div className="image">
                <img src={imageUrl} alt="Uploaded" />
              </div>
            )}
          </>
        ) : (
          <p>Cargando uploader...</p>
        )}
      </div>
    </>
  );
}
