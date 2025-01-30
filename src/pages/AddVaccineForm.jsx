import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createVaccine } from "@/pages/api/services/petsFile/vaccinesService";
import { getAllVets } from "./api/services/vets/Vet";
import * as yup from "yup";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import PrimaryButton from "@/components/PrimaryButton";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  comments: yup.string(),
});

export default function AddVaccineForm({ onClose, onVaccineAdded, petId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [vets, setVets] = useState([]);
  const [selectedVetId, setSelectedVetId] = useState(null);

  useEffect(() => {
    async function fetchVets() {
      try {
        const vetsData = await getAllVets();
        console.log("Vets Data:", vetsData); // Agregar console.log para verificar los datos
        setVets(vetsData.data.vets);
      } catch (error) {
        console.error("Error fetching vets:", error);
      }
    }

    fetchVets();
  }, []);

  const handleVetSelect = (event) => {
    setSelectedVetId(event.target.value);
  };

  const onSubmit = async (data) => {
    alert("Agregar función de registrar vacuna");
    setLoading(true);
    /* try {
      await createVaccine(data);
      toast.success("Vacuna creada con éxito");
    const formattedData = {
      ...data,
      petId,
      vet: selectedVetId,
    };
    try {
      const vaccine = await createVaccine(formattedData);
      toast.success("Vacuna creada con éxito", vaccine);
      if (typeof onVaccineAdded === "function") {
        onVaccineAdded();
      }
      if (typeof onClose === "function") {
        onClose();
      }
    } catch (error) {
      toast.error(`Error creando vacuna: ${error.message}`);
    } finally {
      setLoading(false);
    }*/
  };

  return (
    <section
      className={clsx(
        "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      )}
    >
      <div className="bg-white p-6 rounded-lg shadow-2xl w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <MdClose size={24} />
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre de la vacuna
            </label>
            <input
              {...register("name")}
              className={clsx(
                "w-full rounded-md border border-gray-200 p-2 text-congress-950 mt-1",
                {
                  "border-red-500": errors.date,
                }
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <input
              {...register("comments")}
              className={clsx(
                "w-full rounded-md border border-gray-200 p-2 text-congress-950",
                {
                  "border-red-500": errors.comments,
                }
              )}
            />
          </div>

          <button
            type="submit"
            className="bg-slate-900 text-white px-4 py-2 rounded-md w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Registrar vacuna"}
          </button>
        </form>
      </div>
    </section>
  );
}
