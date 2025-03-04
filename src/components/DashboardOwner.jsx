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
    if (!account || !account.roleInfo || !account.roleInfo.user) {
      return;
    }

    //console.log(JSON.stringify(account.roleInfo));

    async function fetchAllAppointmentsByOwner() {
      try {
        const response = await getAllAppointmentsByOwner(account.roleInfo.user);
        if (response.success) {
          const sortedAppointments = response.data.appointments.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          setAppointments(sortedAppointments);
          console.log("Fetched appointments:", sortedAppointments);
        } else {
          console.error("Error fetching appointments:", response.message);
        }
      } catch (error) {
        console.error("Error fetching all appointments by owner:", error);
      }
    }

    fetchAllAppointmentsByOwner();
  }, [account]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const today = new Date();
  const filteredAppointments = appointments.filter(
    (appointment) => new Date(appointment.date) >= today
  );

  const sortedAppointments = filteredAppointments.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = sortedAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  return (
    <DashboardLayout>
      <main className="bg-gray-100 ml-20 p-8 grid gap-4 grid-cols-1 lg:grid-cols-12 ">
        <div className="grid grid-cols-subgrid gap-4 md:grid-cols-2  lg:col-span-3 xl:col-span-2 lg:grid-cols-1 ">
          <section className="h-44 lg:h-96 bg-white shadow-md rounded-2xl p-6">
            <div className="w-full flex justify-center">
              <img
                src={account.profilePic}
                alt={`${account.name} ${account.lastName}`}
                className="h-64 rounded-md"
              />
            </div>
            <h2 className="text-congress-950 text-center mt-4">
              {account.name} {account.lastName}
            </h2>
            <p className="text-center text-gray-600">{account.email}</p>
          </section>
          <section className="min-h-16 lg:min-h-80 bg-white shadow-md rounded-2xl p-6">
            <header className="text-congress-700 flex flex-col items-center justify-center gap-3">
              <MdCalendarToday className="h-8 w-8" />
              <span className="text-neutral-700 text-xs">Próximas Citas</span>
            </header>
            <ul className="text-gray-800 py-4">
              {currentAppointments.map((appointment, index) => (
                <li
                  key={appointment._id}
                  className={`mb-4 ${index % 2 === 0 ? "bg-gray-100" : ""}`}
                >
                  <div className="flex justify-between">
                    <span>
                      {new Date(appointment.date).toLocaleDateString()}
                    </span>
                    <span>{appointment.hour}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{appointment.petId.name}</span>
                    <span>{appointment.reason}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-gray-200 text-gray-800 rounded disabled:opacity-50 transition ease-in-out duration-300 hover:bg-gray-300"
              >
                Anterior
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={indexOfLastAppointment >= appointments.length}
                className="px-4 py-2 mx-1 bg-gray-200 text-gray-800 rounded disabled:opacity-50 transition ease-in-out duration-300 hover:bg-gray-300"
              >
                Siguiente
              </button>
            </div>
          </section>
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
      </main>
    </DashboardLayout>
  );
}
