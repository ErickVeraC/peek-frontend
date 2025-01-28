import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { MdOutlineMedicalServices } from "react-icons/md";
import { MdPets } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

import ProfileImagePet from "@/components/ProfileImagePet";
import Calendar from "@/components/Calendar";
import ButtonList from "@/components/ButtonList";
import EventHighlight from "@/components/EventHighlight";
import PetName from "@/components/PetName";
import DashboardLayout from "@/Layouts/DashboardLayout";
import EditPetForm from "./editPetForm";
import DelePet from "./deletePet";
import ButtonJoinNow from "@/components/ButtonJoinNow";

import AddVaccineForm from "../AddVaccineForm";
import AddAppointmentForm from "../AddAppointmentForm";

import { getPet } from "../api/services/pets/crudPet";

export default function Mascotas() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletePet, setIsDeletePet] = useState(false);
  const [pet, setPet] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const [isVaccineModalOpen, setIsVaccineModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    getPet(id)
      .then((data) => {
        setPet(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleVaccineModal = () => {
    setIsVaccineModalOpen(!isVaccineModalOpen);
  };

  const handleAppointmentModal = () => {
    setIsAppointmentModalOpen(!isAppointmentModalOpen);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDeletePet = () => {
    setIsDeletePet(!isDeletePet);
  };

  return (
    <DashboardLayout>
      {isLoading && (
        <div className="fixed inset-0 flex items-center bg-black bg-opacity-50 justify-center p-4 text-white z-10">
          <MdPets className="text-white text-6xl animate-bounce" />
        </div>
      )}
      <div className="pl-24 pr-3 bg-gray-100">
        <PetName name={pet.name} />
        <div className="flex flex-wrap md:flex-nowrap gap-8">
          <div className="w-full md:w-[40%]">
            <div className="flex flex-col gap-8">
              <div className="w-full relative ">
                <div className="absolute z-[4] left-7 bottom-6 flex flex-col gap-7">
                  <button
                    onClick={handleModal}
                    className="text-white text-3xl opacity-65"
                  >
                    <MdOutlineEdit />
                  </button>
                  <button
                    onClick={handleDeletePet}
                    className="text-white text-3xl opacity-65"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
                <ProfileImagePet image={pet.picture} />
              </div>
              <div className="w-full bg-white shadow-md rounded-2xl p-9 text-black">
                <Calendar />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-8 md:w-[60%]">
            <div className="flex flex-wrap lg:flex-nowrap  gap-8">
              <div className="w-full lg:w-[65%] flex gap-8 flex-col">
                <div className="min-h-20 bg-unset sm:bg-congress-100 rounded-2xl flex items-center justify-center gap-6 flex-wrap sm:flex-nowrap">
                  <ButtonList />
                </div>
                <div className="flex flex-wrap sm:flex-nowrap gap-8 justify-between">
                  <EventHighlight title="Carnet" icon />
                  <EventHighlight
                    title="Vacunas"
                    percentage="0%"
                    subtitle="puestas"
                    gradient
                  />
                  <EventHighlight
                    title="Última visita"
                    percentage="0"
                    subtitle="días"
                  />
                </div>
              </div>
              <div className="w-full lg:w-[35%] bg-white shadow-md rounded-2xl p-9 ">
                Actividad
              </div>
            </div>
            <div className="w-full bg-white shadow-md rounded-2xl p-9 ">
              <div className="flex flex-col items-center justify-center gap-3">
                <MdOutlineMedicalServices className="h-8 w-8 text-congress-700" />
                <span className="text-neutral-700 text-xs">
                  Historial Médico.
                </span>
              </div>
            </div>
            <section className="flex flex-col md:flex-row gap-2 p-2">
              <ButtonJoinNow onClick={handleVaccineModal}>
                Agregar Vacuna
              </ButtonJoinNow>
              <ButtonJoinNow onClick={handleAppointmentModal}>
                Agregar Cita
              </ButtonJoinNow>

              {isVaccineModalOpen && (
                <AddVaccineForm
                  onClose={handleVaccineModal}
                  onVaccineAdded={handleVaccineAdded}
                />
              )}

              {isAppointmentModalOpen && (
                <AddAppointmentForm
                  onClose={handleAppointmentModal}
                  onAppointmentAdded={handleAppointmentAdded}
                />
              )}
            </section>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <EditPetForm handleModal={handleModal} pet={pet} setPet={setPet} />
      )}
      {isDeletePet && (
        <DelePet handleDeletePet={handleDeletePet} name={pet.name} />
      )}
    </DashboardLayout>
  );
}
