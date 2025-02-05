import DashboardLayout from "@/Layouts/DashboardLayout";
import Pets from "@/pages/pets";
import { MdPets } from "react-icons/md";
import { useAccount } from "@/context/AccountContext";
import { useEffect, useState } from "react";
import { MdCalendarToday } from "react-icons/md";
import {
  getAppointmentsByPetId,
  getAllAppointmentsByOwner,
} from "../pages/api/services/petsFile/appointmentService";

export default function DashboardOwner() {
  const { account } = useAccount();
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  useEffect(() => {
    // console.log("Account data:", account);
    console.log(account.roleInfo._id);
    if (!account || !account.petId) {
      // console.error("petId is undefined");
      return;
    }

    console.log("Fetching appointments for petId:", account.petId);
    console.log("Fetching all appointments for ownerId:", account.ownerId);

    async function fetchAppointments() {
      try {
        const appointmentsData = await getAppointmentsByPetId(account.petId);
        const sortedAppointments = appointmentsData.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setAppointments(sortedAppointments);
        console.log("Fetched appointments:", sortedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }

    async function fetchAllAppointmentsByOwner() {
      try {
        const ownerAppointments = await getAllAppointmentsByOwner(
          account.ownerId
        );
        console.log("Owner Appointments:", ownerAppointments);
      } catch (error) {
        console.error("Error fetching all appointments by owner:", error);
      }
    }

    fetchAppointments();
    fetchAllAppointmentsByOwner();
  }, [account]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  return (
    <DashboardLayout>
      <div className="bg-gray-100 ml-20 p-8 grid gap-4 grid-cols-1 lg:grid-cols-12 ">
        <div className="grid grid-cols-subgrid gap-4 md:grid-cols-2  lg:col-span-3 xl:col-span-2 lg:grid-cols-1 ">
          <div className="h-44 lg:h-96 bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-congress-950">{account.name}</h2>
          </div>
          <div className="min-h-16 lg:h-80 bg-white shadow-md rounded-2xl p-6">
            <div className="text-congress-700 flex flex-col items-center justify-center gap-3">
              <MdCalendarToday className="h-8 w-8" />
              <span className="text-neutral-700 text-xs">Próximas Citas</span>
            </div>
            <ul>
              {currentAppointments.map((appointment) => (
                <li key={appointment._id}>
                  {new Date(appointment.date).toLocaleDateString()}{" "}
                  {appointment.hour}: {appointment.reason}
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={indexOfLastAppointment >= appointments.length}
                className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-subgrid gap-4 md:grid-cols-2  lg:col-span-9 xl:col-span-10 lg:grid-cols-3 lg:content-center">
          <div className="md:col-span-2 lg:col-span-3  lg:row-span-1 text-3xl font-urbanist max-w-md text-congress-950 mb-5">
            <h2 className="text-orange-500">
              <span>Te damos la Bienvenida</span>{" "}
              <span className="text-congress-950">
                ¡Comienza a administrar tu perfil!
              </span>
            </h2>
            <div className="text-congress-950 flex gap-2 mt-5">
              <MdPets className="bg-white rounded-full text-4xl p-2" />
              <span>Mis mascotas</span>
            </div>
          </div>
          <Pets />
        </div>
      </div>
    </DashboardLayout>
  );
}
