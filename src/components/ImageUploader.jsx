import { useState, useEffect } from "react";
import Uppy from "@uppy/core";
import { DragDrop } from "@uppy/react";
import Transloadit from "@uppy/transloadit";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";

export default function ImageUploader({ onUpload }) {
  const [uppy, setUppy] = useState(null);

  useEffect(() => {
    const uppyInstance = new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"],
      },
    });

    uppyInstance.use(Transloadit, {
      params: {
        auth: { key: process.env.NEXT_PUBLIC_TRANSLOADIT_AUTH_KEY },
        template_id: process.env.NEXT_PUBLIC_TRANSLOADIT_TEMPLATE_ID,
      },
      waitForEncoding: true,
    });

    // Manejar la subida completada
    uppyInstance.on("complete", (result) => {
      console.log(
        "Upload complete! We’ve uploaded these files:",
        result.successful
      );

      if (
        result.successful &&
        result.successful[0]?.transloadit?.results?.compress_image
      ) {
        const imageUrl =
          result.successful[0].transloadit.results.compress_image[0].ssl_url;
        onUpload(imageUrl);
      }
    });

    uppyInstance.on("error", (error) => {
      console.error("Error uploading file:", error);
    });

    setUppy(uppyInstance);

    return () => {
      uppyInstance.close();
    };
  }, [onUpload]);

  return (
    <div>
      <h1>Sube una foto</h1>
      {uppy && <DragDrop uppy={uppy} />}{" "}
    </div>
  );
}
