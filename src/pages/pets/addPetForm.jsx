import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPet } from "@/pages/api/services/pets/createPet";
import * as yup from "yup";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import { MdClose } from "react-icons/md";

import ImageUploader from "@/components/ImageUploader";
import PrimaryButton from "@/components/PrimaryButton";

import { getAllVets } from "../api/services/vets/Vet";

const schema = yup.object().shape({
  name: yup.string().required("Nombre requerido").min(2, "Nombre muy corto"),
  birthday: yup
    .date()
    .required("Dia de nacimiento requerido")
    .typeError("Seleccione una fecha"),
  typeAnimal: yup.string().required("Escriba el tipo de mascota"),
  breed: yup.string().required("Escriba la raza de la mascota"),
  picture: yup.string().required("Seleccione una imagen"),
  vet: yup.string().required("Selecciona un veterinario"),
});

export default function AddPetForm({ onClose, onPetAdded }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [vets, setVets] = useState([]);

  // Función que se ejecuta cuando la imagen se sube correctamente
  const handleImageUpload = (url) => {
    setImageUrl(url); // Guarda la URL en el estado
    setValue("picture", url); // Actualiza el campo "picture" del formulario
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await createPet(data);
      toast.success("Mascota creada con éxito");
      if (typeof onPetAdded === "function") {
        onPetAdded();
      }
      if (typeof onClose === "function") {
        onClose();
      }
    } catch (error) {
      toast.error(`Error creando mascota: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchVets = async () => {
      try {
        const vetsData = await getAllVets();
        setVets(vetsData.data.vets); // Guarda la lista de veterinarios en el estado
        console.log("Vets:", vetsData);
      } catch (error) {
        console.error("Error fetching vets:", error);
      }
    };

    fetchVets();
  }, []);

  return (
    <section
      className={clsx(
        "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      )}
    >
      <div className="bg-white p-6 rounded-lg shadow-2xl w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <MdClose className="text-2xl m-auto text-congress-950" />
        </button>
        <h2 className="text-congress-950 text-2xl text-center mb-4">
          Agrega a tu mascota
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2 mt-4"
        >
          <div>
            <label className="w-full text-left text-congress-950">Nombre</label>
            <input
              type="text"
              {...register("name")}
              className={clsx(
                "w-full rounded-md border border-gray-200 p-2 text-congress-950",
                {
                  "border-red-500": errors.name,
                }
              )}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div>
            <label className="w-full text-left text-congress-950">
              Veterinario
            </label>
            <select
              {...register("vet")}
              className={clsx(
                "w-full rounded-md border border-gray-200 p-2 text-congress-950",
                {
                  "border-red-500": errors.vet,
                }
              )}
            >
              <option value="">Veterinario</option>
              {vets.map((vet) => (
                <option key={vet._id} value={vet._id}>
                  {vet.user.name} {vet.user.lastName}
                </option>
              ))}
            </select>
            {errors.vet && (
              <span className="text-red-500">{errors.vet.message}</span>
            )}
          </div>

          <div>
            <label className="w-full text-left text-congress-950">
              Nacimiento
            </label>
            <input
              type="date"
              {...register("birthday")}
              className={clsx(
                "w-full rounded-md border border-gray-200 p-2 text-congress-950",
                {
                  "border-red-500": errors.birthday,
                }
              )}
            />
            {errors.birthday && (
              <span className="text-red-500">{errors.birthday.message}</span>
            )}
          </div>

          <div className="flex flex-row gap-3">
            <div>
              <label className="w-full text-left text-congress-950">Tipo</label>
              <input
                type="text"
                {...register("typeAnimal")}
                className={clsx(
                  "w-full rounded-md border border-gray-200 p-2 text-congress-950",
                  {
                    "border-red-500": errors.typeAnimal,
                  }
                )}
              />
              {errors.typeAnimal && (
                <span className="text-red-500">
                  {errors.typeAnimal.message}
                </span>
              )}
            </div>
            <div>
              <label className="w-full text-left text-congress-950">Raza</label>
              <input
                type="text"
                {...register("breed")}
                className={clsx(
                  "w-full rounded-md border border-gray-200 p-2 text-congress-950",
                  {
                    "border-red-500": errors.breed,
                  }
                )}
              />
              {errors.breed && (
                <span className="text-red-500">{errors.breed.message}</span>
              )}
            </div>
          </div>

          <label className="w-full text-left text-congress-950">Imagen </label>
          <label className="w-full text-left text-congress-950">
            Sube una foto
          </label>
          <ImageUploader onUpload={handleImageUpload} />
          {errors.picture && (
            <span className="text-red-500">{errors.picture.message}</span>
          )}
          <PrimaryButton label="Agregar Mascota" isSubmitting={loading} />
        </form>
      </div>
    </section>
  );
}
