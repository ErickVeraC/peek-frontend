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
  appliedBy: yup
    .string()
    .required("Applied By is required")
    .min(2, "Applied By must be at least 2 characters"),
  petId: yup.string().required("Pet ID is required"),
  vet: yup.string().required("Vet is required"),
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
    setLoading(true);
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
    }
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
        <h2 className="text-congress-950 text-2xl text-center mb-4">
          Agregar Vacuna
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 mt-4"
        >
          <label className="w-full text-left text-congress-950">Name</label>
          <input
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

          <label className="w-full text-left text-congress-950">Comments</label>
          <input
            {...register("comments")}
            className="w-full rounded-md border border-gray-200 p-2 text-congress-950"
          />

          <label className="w-full text-left text-congress-950">
            Applied By
          </label>
          <select
            {...register("appliedBy")}
            onChange={handleVetSelect}
            className={clsx(
              "w-full rounded-md border border-gray-200 p-2 text-congress-950",
              {
                "border-red-500": errors.appliedBy,
              }
            )}
          >
            <option value="">Select a vet</option>
            {vets.map((vet) => (
              <option key={vet._id} value={vet._id}>
                {vet.user}
              </option>
            ))}
          </select>
          {errors.appliedBy && (
            <span className="text-red-500">{errors.appliedBy.message}</span>
          )}

          <div className="flex justify-end">
            <PrimaryButton type="submit" loading={loading}>
              {loading ? "Creating..." : "Create Vaccine"}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
}
