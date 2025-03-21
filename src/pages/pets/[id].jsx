import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "@/context/AccountContext";
import { getUser } from "../api/services/users/User";
import { MdOutlineMedicalServices } from "react-icons/md";
import { MdPets } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import ProfileImagePet from "@/components/ProfileImagePet";
import Calendar from "@/components/Calendar";
import ButtonList from "@/components/ButtonList";
import EventHighlight from "@/components/EventHighlight";
import DashboardLayout from "@/Layouts/DashboardLayout";
import EditPetForm from "./editPetForm";
import DelePet from "./deletePet";
import ButtonJoinNow from "@/components/ButtonJoinNow";
import AddVaccineForm from "../AddVaccineForm";
import AddAppointmentForm from "../AddAppointmentForm";
import AddProcedureForm from "../addProcedureForm";
import { getPet } from "../api/services/pets/crudPet";
import SquareButton from "@/components/SquareButton";
import TableProcedures from "@/components/TableProcedures";
import { getClinicalProceduresByPet } from "@/pages/api/utils";

import { TbCoffin } from "react-icons/tb";

export default function Mascotas({ pet: initialPet, account: initialAccount }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletePet, setIsDeletePet] = useState(false);
  const [pet, setPet] = useState(initialPet || {});
  const router = useRouter();
  const { id } = router.query;
  const [isVaccineModalOpen, setIsVaccineModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isProcedureModalOpen, setIsProcedureModalOpen] = useState(false);
  const { setAccount } = useAccount();
  const [clinicalProcedures, setClinicalProcedures] = useState([]);

  useEffect(() => {
    const fetchProcedures = async () => {
      if (id) {
        // Verifica si id está disponible antes de hacer la solicitud
        const procedures = await getClinicalProceduresByPet(id);
        setClinicalProcedures(procedures || []); // Si no hay procedimientos, ponemos un arreglo vacío
      }
    };

    fetchProcedures();
  }, [id]);

  const updateProcedures = async () => {
    const procedures = await getClinicalProceduresByPet(id);
    //alert(JSON.stringify(procedures));
    setClinicalProcedures(procedures || []); // Si no hay procedimientos, ponemos un arreglo vacío
  };

  useEffect(() => {
    const storedId = localStorage.getItem("access-id");
    const getAccountInfo = async () => {
      try {
        const userInfo = await getUser(storedId);
        const accountInfo = userInfo?.data?.user;

        setAccount({
          name: accountInfo.name,
          lastName: accountInfo.lastName,
          email: accountInfo.email,
          role: accountInfo.role,
          birthday: accountInfo.birthday,
          profilePic: accountInfo.profilePic,
        });
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };
    getAccountInfo();
  }, []);

  const { account } = useAccount();

  useEffect(() => {
    if (!id) return;
    getPet(id)
      .then((data) => {
        setPet(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pet data:", error);
        setIsLoading(false);
      });
  }, [id]);

  const handleVaccineModal = () => {
    setIsVaccineModalOpen(!isVaccineModalOpen);
  };

  const handleProcedureModal = () => {
    setIsProcedureModalOpen(!isProcedureModalOpen);
    updateProcedures();
  };

  const handleAppointmentModal = () => {
    setIsAppointmentModalOpen(!isAppointmentModalOpen);
    if (!isAppointmentModalOpen) {
      getPet(id)
        .then((data) => {
          setPet(data);
        })
        .catch((error) => {
          console.error("Error fetching pet data:", error);
        });
    }
  };

  const handleVaccineAdded = async (newVaccine) => {
    try {
      // alert("Agregar accion despues de registrar vacuna");
      /*
      const updatedVaccines = await addVaccine(pet._id, newVaccine);
      setVaccines(updatedVaccines);*/
    } catch (error) {
      console.error("Error adding vaccine:", error);
    }
  };

  const handdleProcedureAdded = async (newVaccine) => {
    try {
      alert("Agregar accion despues de registrar procedimientos");
      /*
      const updatedVaccines = await addVaccine(pet._id, newVaccine);
      setVaccines(updatedVaccines);*/
    } catch (error) {
      console.error("Error adding vaccine:", error);
    }
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDeletePet = () => {
    setIsDeletePet(!isDeletePet);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center bg-black bg-opacity-50 justify-center p-4 text-white z-10">
        <MdPets className="text-white text-6xl animate-bounce" />
      </div>
    );
  }

  if (!pet) {
    return (
      <DashboardLayout>
        <div className="pl-24 pr-3 bg-gray-100 mt-5">
          <div className="flex flex-wrap md:flex-nowrap gap-8 p-6">
            <div className="w-full text-center">
              <h2 className="text-3xl font-bold">Mascota no encontrada</h2>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="pl-24 pr-3 bg-gray-100 mt-5">
        <div className="flex flex-wrap md:flex-nowrap gap-8 p-6">
          <div className="w-full md:w-[40%]">
            <div className="flex flex-col gap-8">
              <div className="w-full relative ">
                <div className="absolute z-[2] left-7 bottom-6 flex flex-col gap-7">
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
                    <TbCoffin />
                  </button>
                  <h2 className="text-3xl font-bold">
                    {pet?.name || "Nombre no disponible"}
                  </h2>
                </div>
                <ProfileImagePet image={pet?.picture || ""} />
              </div>
              <div className="w-full bg-white shadow-md rounded-2xl p-9 text-black"></div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-8 md:w-[60%]">
            <div className="flex flex-wrap lg:flex-nowrap  gap-8">
              <div className="w-full lg:w-[65%] flex gap-8 flex-col">
                <div className="min-h-44 bg-unset sm:bg-congress-900 rounded-2xl flex items-center justify-evenly gap-6 flex-wrap sm:flex-nowrap">
                  <ButtonList />
                </div>
                <div className="flex flex-wrap sm:flex-nowrap gap-8 justify-between items-end  h-full">
                  {account && account.role === 0 ? (
                    <SquareButton onClick={handleVaccineModal}>
                      Agregar <br /> Vacuna
                    </SquareButton>
                  ) : null}
                  {account && account.role === 0 ? (
                    <SquareButton onClick={handleProcedureModal}>
                      Agregar Procedimiento
                    </SquareButton>
                  ) : null}
                  <SquareButton onClick={handleAppointmentModal}>
                    Agregar <br />
                    Cita
                  </SquareButton>
                </div>
              </div>
              <div className="w-full lg:w-[35%] bg-white shadow-md rounded-2xl p-9 text-congress-800 ">
                <Calendar petId={id} />
              </div>
            </div>
            <div className="w-full bg-white shadow-md rounded-2xl p-9 flex flex-col gap-3">
              <div className="flex flex-row items-center justify-center gap-3">
                <MdOutlineMedicalServices className=" size-6 text-congress-700 font-bold" />
                <span className="text-neutral-700 text-md font-bold">
                  Historial Médico
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <TableProcedures
                  petId={id}
                  procedures={clinicalProcedures}
                ></TableProcedures>
              </div>
            </div>

            <section className="flex flex-col justify-center items-center w-full">
              {isVaccineModalOpen && (
                <AddVaccineForm
                  onClose={handleVaccineModal}
                  onVaccineAdded={handleVaccineAdded}
                  petId={pet?._id}
                />
              )}

              {isProcedureModalOpen && (
                <AddProcedureForm
                  petId={pet?._id}
                  onClose={handleProcedureModal}
                  onVaccineAdded={handdleProcedureAdded}
                />
              )}

              {isAppointmentModalOpen && (
                <AddAppointmentForm
                  onClose={handleAppointmentModal}
                  petId={pet?._id}
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
        <DelePet
          handleDeletePet={handleDeletePet}
          name={pet?.name || "Nombre no disponible"}
        />
      )}
    </DashboardLayout>
  );
}
