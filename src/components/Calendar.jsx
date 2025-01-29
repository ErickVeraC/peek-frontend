import { useEffect, useState } from "react";
import { MdCalendarToday } from "react-icons/md";
import { getAppointmentsByPetId } from "../pages/api/services/petsFile/appointmentService";

export default function Calendar({ petId }) {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  useEffect(() => {
    if (!petId) {
      console.error("petId is undefined");
      return;
    }

    async function fetchAppointments() {
      try {
        const appointmentsData = await getAppointmentsByPetId(petId);
        const sortedAppointments = appointmentsData.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setAppointments(sortedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }

    fetchAppointments();
  }, [petId]);

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
    <div>
      <div className="text-congress-700 flex flex-col items-center justify-center gap-3">
        <MdCalendarToday className="h-8 w-8" />
        <span className="text-neutral-700 text-xs">Próximas Citas</span>
      </div>
      <ul>
        {currentAppointments.map((appointment, index) => (
          <li
            key={appointment._id}
            className={`flex justify-between p-2 ${
              index % 2 === 0 ? "bg-gray-100" : ""
            }`}
          >
            <span>
              {new Date(appointment.date).toLocaleDateString()}{" "}
              {appointment.hour}
            </span>
            <span className="ml-4">{appointment.reason}</span>
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
  );
}
