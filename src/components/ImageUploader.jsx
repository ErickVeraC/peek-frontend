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

  useEffect(() => {
    const uppyInstance = new Uppy({
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
      )
      .on("file-added", (file) => {
        console.log("File added:", file);
        const fileUrl = URL.createObjectURL(file.data);
        console.log("File URL:", fileUrl);
        setImageUrl(fileUrl);
      });

    setUppy(uppyInstance);

    return () => {
      if (uppyInstance) uppyInstance.destroy();
    };
  }, []);

  const onCompleteUploadFiles = (assembly) => {
    console.log("Transloadit complete:", assembly);
    const url = assembly.results[0].ssl_url;
    setImageUrl(url);
  };

  return (
    <>
      <div className="container">
        {uppy ? (
          <>
            <DragDrop uppy={uppy} />
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
