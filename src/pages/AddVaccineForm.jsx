import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { createVaccine } from "@/pages/api/services/petsFile/vaccinesService";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Nombre de la vacuna necesario")
    .min(2, "Nombre muy corto"),
  comments: yup.string(),
});

export default function AddVaccineForm({ onClose, petId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    data.petId = petId;
    data.vet = localStorage.getItem("access-id");
    setLoading(true);
    try {
      await createVaccine(data);
      toast.success("Vacuna registrada con éxito");
      onClose();
    } catch (error) {
      toast.error(`Error creando vacuna: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-congress-600"
        >
          <MdClose size={24} />
        </button>
        <h2 className="text-congress-950 text-2xl text-center mb-4">
          Agrega una vacuna
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre de la vacuna
            </label>
            <input
              {...register("name")}
              className={` text-congress-900 w-full rounded-md border p-2 mt-1 ${
                errors.name ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Comentarios
            </label>
            <input
              {...register("comments")}
              className={`text-congress-900 w-full rounded-md border p-2 ${
                errors.comments ? "border-red-500" : "border-gray-200"
              }`}
            />
          </div>
          <button
            type="submit"
            className="bg-slate-900 text-white px-4 py-2 rounded-md w-full"
            disabled={loading}
          >
            {loading ? "Creando..." : "Registrar vacuna"}
          </button>
        </form>
      </div>
    </section>
  );
}
