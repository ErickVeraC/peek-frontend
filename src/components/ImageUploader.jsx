import { useState, useEffect } from "react";
import Uppy from "@uppy/core";
import { DragDrop } from "@uppy/react";
import Transloadit from "@uppy/transloadit";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";

import { testTransloaditConnection } from "@/pages/api/services/testTransloaditConnection";

export default function ImageUploader({ onUpload }) {
  const [uppy, setUppy] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  const onCompleteUploadFiles = (assembly) => {
    console.log("Assembly completo:", assembly);

    // Intenta extraer la URL desde distintos posibles campos
    const image =
      assembly.results?.export?.[0]?.ssl_url ||
      assembly.results?.export?.[0]?.url ||
      assembly.results?.compress_image?.[0]?.ssl_url ||
      assembly.results?.compress_image?.[0]?.url ||
      "";

    console.log("URL extraída:", image);

    setImageUrl(image);
    setIsUploadingFile(false);

    if (onUpload && image) {
      onUpload(image);
    }
  };

  const onFileInputChange = (event) => {
    setIsUploadingFile(true); // Indica que la carga ha comenzado

    const file = Array.from(event.target.files)[0] || null;

    if (file && uppy) {
      // Remover todos los archivos actuales
      uppy.getFiles().forEach((uploadedFile) => {
        uppy.removeFile(uploadedFile.id);
      });

      // Agregar el nuevo archivo con propiedades adicionales: source y meta
      uppy.addFile({
        name: file.name,
        type: file.type,
        data: file,
        source: "local",
        meta: {}, // Puedes dejarlo vacío
      });

      // Iniciar la carga
      uppy.upload();
    }
  };

  useEffect(() => {
    let uppyInstance = null;

    const checkConnection = async () => {
      const isConnected = await testTransloaditConnection();
      if (!isConnected) {
        console.error("Failed to connect to Transloadit");
        return;
      }

      uppyInstance = new Uppy({
        restrictions: { maxNumberOfFiles: 1 },
      })
        .use(Transloadit, {
          params: JSON.stringify({
            auth: { key: process.env.NEXT_PUBLIC_TRANSLOADIT_AUTH_KEY },
            template_id: process.env.NEXT_PUBLIC_TRANSLOADIT_TEMPLATE_ID,
          }),
          waitForEncoding: true,
        })
        .on("transloadit:complete", onCompleteUploadFiles)
        .on("transloadit:failed", (assembly) =>
          console.error("Transloadit assembly failed:", assembly)
        )
        .on("error", (error) => console.error("Uppy error:", error))
        .on("upload-success", (file, response) =>
          console.log("Upload success:", file, response)
        );

      setUppy(uppyInstance);
    };

    checkConnection();

    return () => {
      if (uppyInstance) uppyInstance.destroy();
    };
  }, []);

  return (
    <>
      <div className="container">
        {uppy ? (
          <>
            <DragDrop uppy={uppy} />
            <p>{isUploadingFile ? "Cargando" : "👍"}</p>
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
