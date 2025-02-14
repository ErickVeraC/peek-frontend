import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

import { useState, useEffect } from "react";
import Uppy from "@uppy/core";
import Transloadit from "@uppy/transloadit";
import { Dashboard } from "@uppy/react";

export default function ImageUploader({ onUpload }) {
  const [uppy, setUppy] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const onCompleteUploadFiles = (assembly) => {
    const image = assembly.results?.compress_image?.[0]?.ssl_url;
    console.log("imageloader", image);
    if (image) {
      setImageUrl(image);
      if (onUpload) onUpload(image); // Descomentar esta línea
    }
  };

  useEffect(() => {
    const uppyInstance = new Uppy({
      restrictions: { maxNumberOfFiles: 1 },
    })
      .use(Transloadit, {
        assemblyOptions: {
          params: {
            auth: { key: process.env.NEXT_PUBLIC_TRANSLOADIT_AUTH_KEY },
            template_id: process.env.NEXT_PUBLIC_TRANSLOADIT_TEMPLATE_ID,
          },
        },
        waitForEncoding: true,
      })
      .on("transloadit:complete", onCompleteUploadFiles);
    console.log("uppyInstace", uppyInstance);
    setUppy(uppyInstance);

    return () => {
      if (uppyInstance) uppyInstance.destroy();
    };
  }, [onUpload]);

  return (
    <>
      <div className="container">
        {uppy && (
          <div className=" flex flex-row gap-5">
            <Dashboard uppy={uppy} height={100} className="max-w-60" />
            {imageUrl && (
              <div className="image max-w-16">
                <img src={imageUrl} height={500} alt="Uploaded" />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
