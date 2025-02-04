import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editPet } from "@/pages/api/services/pets/crudPet";
import * as yup from "yup";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { MdClose } from "react-icons/md";

import ImageUploader from "@/components/ImageUploader";
import PrimaryButton from "@/components/PrimaryButton";
import { getAllVets } from "../api/services/vets/Vet";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  birthday: yup.date().required("Birthday is required"),
  typeAnimal: yup.string().required("Type of animal is required"),
  breed: yup.string().required("Breed is required"),
  picture: yup.string().required("Picture URL is required"),
});

export default function EditPetForm({ handleModal, pet = {}, setPet }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [vets, setVets] = useState([]);

  // Función que se ejecuta cuando la imagen se sube correctamente
  const handleImageUpload = (url) => {
    setImageUrl(url); // Guarda la URL en el estado
    setValue("picture", url); // Actualiza el campo "picture" del formulario
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: pet.name || "",
      birthday: pet.birthday
        ? new Date(pet.birthday).toISOString().split("T")[0]
        : "",
      typeAnimal: pet.typeAnimal || "",
      breed: pet.breed || "",
      picture: pet.picture || "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const datapet = await editPet(id, data);
      toast.success("Mascota actualizada con éxito");
      setLoading(false);
      handleModal();
      setPet(data);
    } catch (error) {
      setLoading(false);
      toast.error(`Error al actualizar mascota: ${error.message}`);
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
        <button onClick={handleModal} className="absolute top-2 right-2">
          <MdClose className="text-2xl m-auto text-congress-950" />
        </button>
        <h2 className="text-congress-950 text-2xl text-center mb-4">
          Edita los datos de tu mascota
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 mt-4"
        >
          <label className="w-full text-left text-congress-950">Name</label>
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

          <label className="w-full text-left text-congress-950">Vet</label>
          <select
            {...register("vet")}
            className={clsx(
              "w-full rounded-md border border-gray-200 p-2 text-congress-950",
              {
                "border-red-500": errors.vet,
              }
            )}
          >
            <option value="">Select a vet</option>
            {vets.map((vet) => (
              <option key={vet._id} value={vet._id}>
                {vet.user.name} {vet.user.lastName}
              </option>
            ))}
          </select>
          {errors.vet && (
            <span className="text-red-500">{errors.vet.message}</span>
          )}

          <label className="w-full text-left text-congress-950">Birthday</label>
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

          <label className="w-full text-left text-congress-950">
            Type of Animal
          </label>
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
            <span className="text-red-500">{errors.typeAnimal.message}</span>
          )}

          <label className="w-full text-left text-congress-950">Breed</label>
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

          <ImageUploader onUpload={handleImageUpload} />
          {errors.picture && (
            <span className="text-red-500">{errors.picture.message}</span>
          )}
          <PrimaryButton
            label="Editar datos de Mascota"
            isSubmitting={loading}
          />
        </form>
      </div>
    </section>
  );
}
